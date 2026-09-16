import styles from '../components/StatusMessage.module.scss';

function NotFoundPage() {
  return (
    <main className={styles.hashtagMain}>
      <p className={styles.emptyHint}>이런 주소는 없어요.</p>
    </main>
  );
}

export default NotFoundPage;