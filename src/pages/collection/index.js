import Head from 'next/head';
// import Image from 'next/image';

import styles from './home.module.scss';

import Collection from '../../components/Collection';

export default function About() {
  return (
    <>
      <Head>
        <title>Collection | Discogs to Spotify</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <h1>
            Export your Discogs collection to a new
            <span> Spotify</span>
            {' '}
            playlist
          </h1>
          <Collection />
        </section>

        <img src="/images/vinyl.png" alt="Discogs to spotify" />
      </main>
    </>
  );
}
