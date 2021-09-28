import {SignInButton} from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <h2>Discogs to Spotify</h2>
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>About</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
};