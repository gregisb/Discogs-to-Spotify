import styles from './styles.module.scss';

export function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Developed by
        <a href="https://guilhermeregis.com" target="_blank" rel="noreferrer">Guilherme Regis</a>
      </p>
    </div>
  );
}
