import Head from 'next/head';
import Image from 'next/image';
import { SignInButton } from '../components/SignInButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Discogs to Spotify</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <h1>
            Discogs to
            <span> Spotify</span>
          </h1>
          <p>
            Your
            <span style={{ color: 'white' }}> Discogs</span>
            {' '}
            collections on
            <span> Spotify</span>
            .
          </p>
          <SignInButton />
        </section>

        <img src="/images/vinyl.png" alt="Discogs to spotify" />
      </main>
    </>
  );
}
