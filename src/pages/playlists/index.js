import Head from 'next/head';
// import Image from 'next/image';

import styles from './home.module.scss';

import Playlists from '../../components/Playlist';

export default function About() {
  return (
    <>
      <Head>
        <title>Playlists | Discogs to Spotify</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>

          <Playlists />
        </section>

        <img src="/images/vinyl.png" alt="Discogs to spotify" />
      </main>
    </>
  );
}
