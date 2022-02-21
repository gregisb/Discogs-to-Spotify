import Head from 'next/head';

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
            Discogs to
            {' '}
            <span>Spotify</span>
            {' '}
            is an open source project developed by
            {' '}
            <a href="https://guilhermeregis.com" target="_blank" rel="noreferrer">Guilherme Regis</a>
            {' '}
            that allows you to create Spotify playlists based on any Discogs lists.
            {' '}
            <br />
            To create a new playlist you need to sign in with your Spotify account and provide
            a link to any list on
            {' '}
            <a href="https://discogs.com" target="_blank" rel="noreferrer">Discogs</a>
            .
          </p>
        </section>

        <img src="/images/vinyl.png" alt="Discogs to spotify" />
      </main>
    </>
  );
}
