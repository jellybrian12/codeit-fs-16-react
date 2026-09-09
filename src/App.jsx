import { useState, useEffect } from "react";
import page from './components/FeedPage.module.scss';
// import Stories from './lab/p2-07/practice3.jsx';
import Stories from './components/Stories.jsx';
import FeedList from "./components/FeedList.jsx";


const App = () => {
  //데이터배열을 상태로 관리
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/posts');
        if (!response.ok) {
          throw new Error(`서버가${response.status}로 답했어요`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('게시물을 가져오지 못했어요.', error);
      }
    };

    loadPosts();
  }, []);

  const handleDelete  = (id)=>{
    //지운다는것은 -> 필터링한다는것
    //지금 내가 지목한 얘 빼고 남겨줘 
    setPosts(posts.filter(post => post.id !== id));
  }
  return (
    <main className={page.mainContent}>
      <Stories />
      <FeedList 
        posts={posts} 
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;