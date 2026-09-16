// ~/instagram-react/src/pages/FeedPage.jsx
import { usePostsContext } from '../contexts/PostsContext.jsx';
import page from '../components/FeedPage.module.scss';
import stateStyles from '../components/StatusMessage.module.scss';
import FeedList from '../components/FeedList.jsx';
import Stories from '../components/Stories.jsx';
import UserSearch from '../components/UserSearch.jsx';
import { useSearchParams } from 'react-router';

function FeedPage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUser = searchParams.get('user');

  const { error, selectUser } = usePostsContext();

  return (
    <main className={page.mainContent}>
      <UserSearch onSearch={selectUser} />
      <Stories onSelect={selectUser} />
      {error ? (
        <p className={stateStyles.errorText}>{error}</p>
      ) : (
        <FeedList />
      )}
    </main>
  );
}

export default FeedPage;