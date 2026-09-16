import { Navigate, Route, Routes } from "react-router";
import Sidebar from './components/Sidebar.jsx';
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import RootLayout from "./layouts/RootLayout.jsx";
// import { PostsProvider } from './contexts/PostsContext.jsx'

const App = () => {
  return (
    <>

      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <FeedPage />
            } />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Route>
      </Routes>
    </>

  );
}
export default App;