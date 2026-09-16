// ~/instagram-react/src/lab/p2-18/practice2.jsx
import { Link, Routes, Route } from 'react-router';

// 이 값은 «문서가 만들어질 때» 한 번만 정해져요. 문서가 새로 만들어지면 값이 바뀌고,
// 화면만 바꾼 것이라면 그대로예요.
const documentNumber = Math.floor(Math.random() * 10000);

function OneScreen({ name }) {
  return (
    <div>
      <h2>{name} 화면</h2>
      <p>문서 번호: {documentNumber}</p>
      <a href="/about">a 태그로 소개 화면</a>
      <Link to="/about">Link로 소개 화면</Link>
      <a href="/">a 태그로 홈</a>
      <Link to="/">Link로 홈</Link>
    </div>
  );
}

export default function Practice2() {
  return (
    <Routes>
      <Route path="/" element={<OneScreen name="홈" />} />
      <Route path="/about" element={<OneScreen name="소개" />} />
    </Routes>
  );
}