import Link from 'next/link'

import {SignInButton} from '../SignInButton';

import styles from './styles.module.scss';

export function Header(props) {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <h2>Discogs to Spotify</h2>
                <nav>
                    <Link href='/' className={styles.active}>Home</Link>
                    <a href="https://github.com/gregisb/Discogs-to-Spotify" target="_blank" rel="noopener noreferrer">Source</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
};