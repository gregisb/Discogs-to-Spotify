import styles from './styles.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Developed by
        {' '}
        <a href="https://guilhermeregis.com" target="_blank" rel="noreferrer">Guilherme Regis</a>
        .
        {' '}
        <br />
        {' '}
        Help me continue this project by
        {' '}
        <a href="https://www.buymeacoffee.com/gregis" target="_blank" rel="noreferrer">buying me a coffee!</a>

      </p>
    </div>
  );
}
