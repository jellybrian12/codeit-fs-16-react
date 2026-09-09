import { useEffect, useState } from "react";
import styles from "./Stories.module.scss";
import StoryItem from "./StoryItem.jsx";

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(()=>{
    const loadStories = async () =>{
      try{
        const res = await fetch("http://localhost:3001/stories");
        if (!res.ok) {
            throw new Error(`서버가${res.status}로 답했어요`);
          }
          const data = await res.json();
          setStories(data);
        } catch (error) {
          console.error("스토리를 가져오지 못했어요.", error);
      }
    }

    loadStories();
  })

  return (
    <div className={styles.storiesContainer}>
      <div className={styles.storiesList}>
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            username={story.username}
            profileImage={`https://picsum.photos/seed/${story.username}/50/50`}
            unseen={story.unseen}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;