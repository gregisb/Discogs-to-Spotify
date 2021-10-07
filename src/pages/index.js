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
            <h1>Discogs to <span>Spotify</span></h1>
          <p>
          Miss your vinyl collection when on the road? We want to help you import your 
          <span style={{color: 'white'}}> Discogs</span> collection as playlists into <span>Spotify</span>!
          </p>
          <SignInButton />
        </section>

        <img src="/images/vinyl.png" alt="Discogs to spotify" />
      </main>
    </> 
  )
}
