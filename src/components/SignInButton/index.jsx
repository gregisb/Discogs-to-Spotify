import { FaSpotify } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

import {signIn, signOut, useSession} from 'next-auth/client';
import { getSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { useEffect } from 'react'

export function SignInButton() {
    
    const [session, loading] = useSession();

    const router = useRouter();

    useEffect(() => {
        console.log('signin button effect')
        if(!session) {
            console.log('routing to home')
            router.replace('/')
        } 
    }, []);

    const signInRedirect = () => {
        
        //se o signin funcionar redirecionar pra /collection
    }

    console.log(session)

  
    
    return session ? (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={signOut}
            >
            <FaSpotify color="white"/>
              {session.user.name}
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