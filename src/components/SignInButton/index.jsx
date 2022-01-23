import { FaSpotify } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

import {signIn, signOut, useSession} from 'next-auth/client';
import { getSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { useEffect } from 'react';



export function SignInButton() {
    
    const [session, loading] = useSession();

    const router = useRouter();

    const signInRedirect = () => {
        signIn('spotify', { callbackUrl: 'http://localhost:3000/collection' })
    };

    const signOutRedirect = () => {
        signOut( { callbackUrl: 'http://localhost:3000/' })
    };

   
    useEffect(() => {
     
        if(!session) {
            router.replace('/')
        } else if(router.pathname === '/') {  
            router.replace('/collection')
        }
        
    }, [session]);

    

            
    return session ? (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={signOutRedirect}
            >
            <FaSpotify color="white"/>
              {session.user.name}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signInButton}
        onClick={signInRedirect}
        >
        <FaSpotify color="#white"/>
        Sign in with Spotify
    </button>
    )
}