import { FaSpotify } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import {

  signIn, signOut, useSession, getCsrfToken,
} from 'next-auth/react';

import SpotifyWebApi from 'spotify-web-api-node';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export function SignInButton() {
  const spotifyApi = new SpotifyWebApi();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const router = useRouter();

  const signInRedirect = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000/collection' });
  };

  const signOutRedirect = () => {
    signOut({ callbackUrl: 'http://localhost:3000/' });
  };

  useEffect(() => {
    if (!session && !loading) {
      router.replace('/');
    } else if (session && router.pathname === '/') {
      router.replace('/collection');
    } else if (session) {
      console.log(session);
      spotifyApi.setAccessToken(session.accessToken);
      // Get Elvis' albums
      spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
        (data) => {
          console.log('Artist albums', data.body);
        },
        (err) => {
          console.error(err);
        },
      );
    }
  }, [session, loading]);

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={signOutRedirect}
    >
      <FaSpotify color="white" />
      <span className={styles.signinButtonText}>{session.user.name}</span>
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={signInRedirect}
    >
      <FaSpotify color="#white" />
      <span className={styles.signinButtonText}>Sign in with Spotify</span>
    </button>
  );
}
