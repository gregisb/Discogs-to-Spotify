import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const { filteredAlbuns } = useContext(ListContext);
  console.log('playlists', filteredAlbuns);

  function onSubmit(e) {
    e.preventDefault();

    // buscar as músicas no spotify utilizando nome da track + nome do album;

    // selecionar a principal faixa correspondente de cada música;
    // criar um objeto com as faixas selecionadas
    // criar uma nova playlist
    // popular a playlist com os dados
  }

  return (
    <div />

  // <form>
  //   <label>Give your playlist a name: </label>
  //   <input
  //     type="text"
  //     onChange={(e) => setPlaylistTitle(e.target.value)}
  //     value={playlistTitle}
  //   />
  //   <button type="button" onClick={onSubmit}>Create new playlist</button>

  // </form>
  // </div>
  );
}

export default Playlist;
