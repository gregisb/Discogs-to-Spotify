import Head from 'next/head';
// import Image from 'next/image';

import styles from './home.module.scss';

import CollectionPreviwer from '../../components/Collection';

export default function Collections() {
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
          <CollectionPreviwer />
        </section>
        <div>
          <img src="/images/vinyl.png" alt="Discogs to spotify" />
        </div>

      </main>
    </>
  );
}
