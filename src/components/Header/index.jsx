import Link from 'next/link';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header(props) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h2>
          <Link href="/">Discogs to Spotify</Link>
        </h2>
        <nav>
          <Link href="/" className={styles.active}>Home</Link>
          <Link href="/about" className={styles.active}>About</Link>
          <a href="https://github.com/gregisb/Discogs-to-Spotify" target="_blank" rel="noopener noreferrer">Source</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
