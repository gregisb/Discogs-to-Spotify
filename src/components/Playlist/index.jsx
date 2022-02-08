import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const { filteredAlbuns } = useContext(ListContext);
  console.log('playlists', filteredAlbuns);

  const [playlistTitle, setPlaylistTitle] = useState('');

  function onSubmit(e) {
    e.preventDefault();

    // buscar as músicas no spotify utilizando nome da track + nome do album;

    // selecionar a principal faixa correspondente de cada música;
    // criar um objeto com as faixas selecionadas
    // criar uma nova playlist
    // popular a playlist com os dados
  }

  return (
    <div className={styles.container}>
      <p>You've selected the following tracks to be add to the new playlist:</p>
      <div className={styles.songs}>
        {Object.keys(filteredAlbuns).map((albumTitle) => (
          <ol>
            {filteredAlbuns[albumTitle].map((filteredTracks) => (
              <li>{filteredTracks.title}</li>
            ))}

          </ol>
        ))}
      </div>
      <form>
        <label className={styles.label}>Give your playlist a name: </label>
        <input
          id="text"
          type="text"
          onChange={(e) => setPlaylistTitle(e.target.value)}
          value={playlistTitle}
          placeholder="Playlist title"
          autoComplete="off"
        />
        <button className={styles.generatebutton} type="button" onClick={onSubmit}>Create new playlist</button>

      </form>
    </div>
  );
}

export default Playlist;
