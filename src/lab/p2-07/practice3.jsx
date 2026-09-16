import { useState } from "react";
import styles from '../../components/Stories.module.scss';

const initialStories = [
  { id: 1, username: "jaehoon", unseen: true },
  { id: 2, username: "minji", unseen: true },
  { id: 3, username: "seungwoo", unseen: false },
  { id: 4, username: "yuna", unseen: true },
  { id: 5, username: "dohyun", unseen: false },
  { id: 6, username: "ssong", unseen: true },
  { id: 7, username: "hyerin", unseen: false },
  { id: 8, username: "taeyang", unseen: true },
];


const StoryItem = ({ username, profileImage, unseen, onSeen }) => {
  return (
    <div className={styles.storyItem} onClick={onSeen}>
      <div className={styles.storyAvatar}>
        {unseen &&<div className={styles.storyRing}></div>}
        <img src={profileImage} alt={`${username}의 스토리`} />
      </div>
      <span className={styles.storyUsername}>{username}</span>
    </div>
  );
};

const Stories = () => {
  const [stories,setStories] = useState(initialStories)
  const handleSeen = (id)=>{
    // //어떤 스토리를 눌렀는지 알아야함
    // const found = stories.find(s=>s.id===id)
    // console.log(found)
    // found.unseen = false;
    // const copyStories = [...stories]
    // setStories(copyStories)

    //map으로
    setStories(stories.map(
      s => s.id === id ? { ...s, unseen: false } : s
    ))
  }

  const unseenCount = stories.filter((story) => story.unseen).length;

  return (
    <div className={styles.storiesContainer}>
      {unseenCount > 0 && <p>안 본 스토리 {unseenCount}개</p>}
      <div className={styles.storiesList}>
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            username={story.username}
            profileImage={`https://picsum.photos/seed/${story.username}/50/50`}
            unseen={story.unseen}
            onSeen={()=>handleSeen(story.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;