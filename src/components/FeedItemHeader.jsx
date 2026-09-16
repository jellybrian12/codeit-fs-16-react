import { Link } from "react-router";
import styles from './FeedItem.module.scss'
import { FaEllipsis } from "react-icons/fa6";
import { usePostsContext } from '../contexts/PostsContext';
const FeedItemHeader = ({
  postId,
  username,
  profileImage = "https://picsum.photos/seed/default/40/40",
}) => {

  const { removePost } = usePostsContext()

  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <Link to={`/${username}`} className="profileLink">
          <div className={styles.profileImage}>
            <img src={profileImage} alt={`${username}의 프로필`} />
          </div>
        </Link>
        <div className={styles.userDetails}>
          <Link to={`/${username}`} className="username">{username}</Link>
        </div>
      </div>
      <button className={styles.optionsButton} onClick={() => removePost(postId)}><FaEllipsis /></button>
    </header>
  );
};

export default FeedItemHeader;