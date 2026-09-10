import { useState, useEffect, useRef } from "react";
import page from './components/FeedPage.module.scss';
// import Stories from './lab/p2-07/practice3.jsx';
import Stories from './components/Stories.jsx';
import FeedList from "./components/FeedList.jsx";
import stateStyles from './components/StatusMessage.module.scss';

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
      const url = selectedUser
        ? `http://localhost:3001/posts?username=${selectedUser}&${condition}`
        : `http://localhost:3001/posts?${condition}`;
      setIsLoading(true);
      setError(null)
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`서버가${response.status}로 답했어요`);
        }
        const envelope = await response.json();
        setPosts([...posts,...envelope.data]);
        setNextPage(envelope.next);
      } catch (err) {
        if (err.name === 'AbortError') {
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

  const handleDelete  = (id)=>{
    //지운다는것은 -> 필터링한다는것
    //지금 내가 지목한 얘 빼고 남겨줘 
    setPosts(posts.filter(post => post.id !== id));
  }

  const handleSelectUser = (username) => {
    // setSelectedUser(selectedUser === username ? null : username)
    setSelectedUser((current) => (current === username ? null : username));
    setPageNumber(1);
    setPosts([])
  };

  // const handleLoadMore = () => {
  //   setPageNumber((current) => current + 1);
  // };
  
  const handleAddComment = (id) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, commentCount: post.commentCount + 1 } : post,
      ),
    );
  };




  //댓글 개수 처리를 위한 진동벨 함수 생성


  return (
    <main className={page.mainContent}>
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
    </main>
  );
}

export default App;