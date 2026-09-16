import { useState } from "react";
import styles from './FeedItem.module.scss'
import { FaHeart, FaRegBookmark, FaRegComment, FaRegHeart, FaRegPaperPlane } from "react-icons/fa6";
import {postApi} from "../services/api.js";

const FeedItemActions = ({likeCount, postId}) => {
  // const [liked, setLiked] = useState(false);
  // const [count, setCount] = useState(likeCount);

  const [like, setLike] = useState({
    liked: false,
    count: likeCount,
  });

  const handleLike = async () => {
    const previous = like;
    const next = {
      liked: !like.liked,
      count: like.liked ? like.count - 1 : like.count + 1,
    };
    setLike(next);

    try {
      await postApi.updateLikeCount(postId,next.count);
    } catch (err) {
      console.error("좋아요를 저장하지 못했어요.", err);
      setLike(previous);
    }
  };


  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <div className={styles.leftButtons}>
          <button 
            type="button" 
            className={`${styles.actionButton} ${like.liked ? styles.liked : ''}`}
            onClick={handleLike}>
              {like.liked ? <FaHeart /> : <FaRegHeart/>}             
          </button>
          <button 
            type="button" 
            className={styles.actionButton}>
              <FaRegComment/>
          </button>
          <button 
            type="button" 
            className={styles.actionButton}>
              <FaRegPaperPlane/>
          </button>
        </div>
        <button 
          type="button" 
          className={styles.actionButton}>
            <FaRegBookmark/>
        </button>
      </div>
      <div className={styles.likes}>
        좋아요 <span>{like.count.toLocaleString()}</span>개
      </div>
    </div>
  );
};

export default FeedItemActions;