import { FaSpotify } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

import env from 'react-dotenv'
import {test} from '../../lib/dotenv'

export function SignInButton() {
    test();
    console.log(process.env.REACT_APP_CLIENT_ID);

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