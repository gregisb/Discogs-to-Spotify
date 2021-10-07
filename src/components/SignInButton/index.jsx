import { FaSpotify } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
    const isUserLoggedIn = false;
    
    return isUserLoggedIn ? (
        <button 
            type="button"
            className={styles.signInButton}
            >
            <FaSpotify color="white"/>
            Guilherme Regis
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signInButton}
        >
        <FaSpotify color="#white"/>
        Sign in with Spotify
    </button>
    )
}