import Head from 'next/head';
import Image from 'next/image';
import { SignInButton } from '../components/SignInButton';

import styles from './home.module.scss';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Discogs to Spotify</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <h1>About</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printerand more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <SignInButton />
        </section>

        <img src="/images/vinyl.png" alt="Discogs to spotify" />
      </main>
    </>
  );
}
