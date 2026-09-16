const tags = [
  { id: 1, name: '한강', count: 12400 },
  { id: 2, name: '노을', count: 8700 },
  { id: 3, name: '카페', count: 152000 },
  { id: 4, name: '퇴근길', count: 340 },
];

const PopularTagList = () => {
  const popular = tags.filter((tag) => tag.count >= 1000);

  return (
    <ul>
      {popular.map((tag) => (
        <li key={tag.id}>
          #{tag.name} 게시물 {tag.count.toLocaleString()}개
          {tag.count >= 100000 && ' 🔥'}
        </li>
      ))}
    </ul>
  );
};

export default PopularTagList;