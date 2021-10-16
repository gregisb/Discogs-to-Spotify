import { FaSpotify } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

import {signIn, signOut, useSession} from 'next-auth/client';

export function SignInButton() {
    
    console.log(process.env.NEXT_PUBLIC_CLIENT_ID);

    const isUserLoggedIn = false;

    const [session, loading] = useSession();
    console.log(session)
    
    return isUserLoggedIn ? (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={signOut}
            >
            <FaSpotify color="white"/>
            Guilherme Regis
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signInButton}
        onClick={signIn}
        >
        <FaSpotify color="#white"/>
        Sign in with Spotify
    </button>
    )
}