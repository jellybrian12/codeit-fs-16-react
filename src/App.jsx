import { useState, useEffect, useRef } from "react";
import page from './components/FeedPage.module.scss';
// import Stories from './lab/p2-07/practice3.jsx';
import Stories from './components/Stories.jsx';
import FeedList from "./components/FeedList.jsx";
import stateStyles from './components/StatusMessage.module.scss';
import CreateFeedModal from './components/CreateFeedModal.jsx';
import {postApi} from "./services/api.js";
import axios from "axios";
import { usePosts } from "./hooks/usePosts.js";
import UserSearch from "./components/UserSearch.jsx";


const App = () => {

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const {
    posts,
    isLoading,
    error,
    loaderRef,
    addPost,
    removePost,
    countUpComment,
    selectUser,
  }= usePosts();

  return (
    <main className={page.mainContent}>
      <button type="button" onClick={() => setIsCreateOpen(true)}>
        새 게시물
      </button>

      <UserSearch onSearch={selectUser}/>

      <Stories onSelect={selectUser}/>
      {error ? (
        <p className={stateStyles.errorText}>{error}</p>
      ) : (
        <>
          <FeedList 
            posts={posts} 
            isLoading={isLoading} 
            onDelete={removePost} 
            onAddComment={countUpComment}
            loaderRef={loaderRef}
          />
          {/* {nextPage && !isLoading && (
            <button type="button" onClick={handleLoadMore}>
              더 보기
            </button>
          )} */}
        </>
      )}

      {isCreateOpen && <CreateFeedModal onClose={()=> setIsCreateOpen(false)} onCreate={addPost}/>}

    </main>
  );
}

export default App;