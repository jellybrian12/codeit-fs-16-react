// ~/instagram-react/src/lab/p2-18/practice3.jsx
import { useState } from 'react';
import { Link, Routes, Route } from 'react-router';

function CountScreen() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>세는 화면</h2>
      <p>지금 {count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        하나 올리기
      </button>
    </div>
  );
}

function OtherScreen() {
  return <h2>다른 화면</h2>;
}

export default function Practice3() {
  return (
    <div>
      <nav>
        <Link to="/">세는 화면으로</Link>
        <Link to="/other">다른 화면으로</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CountScreen />} />
        <Route path="/other" element={<OtherScreen />} />
      </Routes>
    </div>
  );
}