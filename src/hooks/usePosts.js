import { useState, useEffect, useRef, useCallback  } from 'react';
import axios from 'axios';
import { postApi } from '../services/api.js';
import { useSearchParams } from 'react-router';

const PER_PAGE = 2;

export const usePosts=() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUser = searchParams.get('user');

  //데이터배열을 상태로 관리
  const [posts, setPosts] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(() =>
  //   localStorage.getItem('lastUser'),
  // );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const loaderRef = useRef(null);

  useEffect(() => {
    setPageNumber(1);
    setPosts([]);
  }, [selectedUser]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const loadPosts = async () => {
      const condition = `_page=${pageNumber}&_per_page=${PER_PAGE}`;
      const query = selectedUser
        ? `username=${selectedUser}&${condition}`
        : condition;

      setIsLoading(true);
      setError(null);

      try {
        const envelope = await postApi.getPage(query, { signal: controller.signal });
        setPosts((current) => [...current, ...envelope.data]);
        setNextPage(envelope.next);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error('게시물을 가져오지 못했어요.', err);
        setError('게시물을 불러오지 못했습니다.');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
      controller.abort();
    };

  }, [selectedUser, pageNumber]);

  //무한 스크롤 옵저버 처리
  useEffect(()=>{
    if (nextPage === null || isLoading) {
      return;
    }

    const target = loaderRef.current;
    if (target === null) {
      return;
    }

    //옵저버를 생성해서 감시를 맡김
    const observer = new IntersectionObserver((entries)=>{
      if (entries[0].isIntersecting) {
        setPageNumber((current) => current + 1);
      }
    })
    observer.observe(target);

    return () => observer.disconnect();

  },[nextPage, isLoading])


  const removePost = async (id) => {
    //이거 백업 지우기전 포스트 백업
    const previous = posts;
    setPosts(posts.filter((post) => post.id !== id));

    try {
      await postApi.remove(id);
    } catch (err) {
      console.error('게시물을 지우지 못했어요.', err);
      setPosts(previous);
    }
  };

  const selectUser = useCallback((username) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);

      if (next.get('user') === username) {
        next.delete('user');
      } else {
        next.set('user', username);
      }

      return next;
    });
  }, [setSearchParams]);
  // const handleLoadMore = () => {
  //   setPageNumber((current) => current + 1);
  // };
  
  //댓글 개수 처리를 위한 진동벨 함수 생성

  const countUpComment = (id) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, commentCount: post.commentCount + 1 } : post,
      ),
    );
  };

  //피드 생성 처리를 위한 진동벨 함수 생성
  const addPost = (createdPost) =>{
    setPosts(current => [createdPost, ...current])
  }


  return {
    posts,
    isLoading,
    error,
    loaderRef,
    addPost,
    removePost,
    countUpComment,
    selectUser,
  };
}