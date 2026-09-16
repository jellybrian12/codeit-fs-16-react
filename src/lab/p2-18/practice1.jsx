import { Routes, Route } from 'react-router';

const Home = () => {
  return <h2>여기는 홈이에요</h2>;
}

const About = () => {
  return <h2>여기는 소개예요</h2>;
}

const Help = () => {
  return <h2>여기는 도움말이에요</h2>;
}

const Practice1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
}

export default Practice1