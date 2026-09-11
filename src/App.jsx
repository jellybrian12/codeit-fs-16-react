import { useState, useEffect, useRef } from "react";
import page from './components/FeedPage.module.scss';
// import Stories from './lab/p2-07/practice3.jsx';
import Stories from './components/Stories.jsx';
import FeedList from "./components/FeedList.jsx";
import stateStyles from './components/StatusMessage.module.scss';
import CreateFeedModal from './components/CreateFeedModal.jsx';
import {postApi} from "./services/api.js";
import axios from "axios";


const PER_PAGE = 4;

const App = () => {
  //데이터배열을 상태로 관리
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(() =>
    localStorage.getItem('lastUser'),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const loaderRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('lastUser', selectedUser);
    } else {
      localStorage.removeItem('lastUser');
    }
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

  const handleDelete = async (id) => {
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

  const handleSelectUser = (username) => {
    // setSelectedUser(selectedUser === username ? null : username)
    setSelectedUser((current) => (current === username ? null : username));
    setPageNumber(1);
    setPosts([])
  };

  // const handleLoadMore = () => {
  //   setPageNumber((current) => current + 1);
  // };
  
  //댓글 개수 처리를 위한 진동벨 함수 생성

  const handleAddComment = (id) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, commentCount: post.commentCount + 1 } : post,
      ),
    );
  };

  //피드 생성 처리를 위한 진동벨 함수 생성
  const handleCreate = (createdPost) =>{
    setPosts(current => [createdPost, ...current])
  }




  return (
    <main className={page.mainContent}>
      <button type="button" onClick={() => setIsCreateOpen(true)}>
        새 게시물
      </button>
      <Stories onSelect={handleSelectUser}/>
      {error ? (
        <p className={stateStyles.errorText}>{error}</p>
      ) : (
        <>
          <FeedList 
            posts={posts} 
            isLoading={isLoading} 
            onDelete={handleDelete} 
            onAddComment={handleAddComment}
            loaderRef={loaderRef}
          />
          {/* {nextPage && !isLoading && (
            <button type="button" onClick={handleLoadMore}>
              더 보기
            </button>
          )} */}
        </>
      )}

      {isCreateOpen && <CreateFeedModal onClose={()=> setIsCreateOpen(false)} onCreate={handleCreate}/>}

    </main>
  );
}

export default App;