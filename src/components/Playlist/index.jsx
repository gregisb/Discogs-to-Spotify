import React, { useState, useContext } from 'react';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const { checked, albuns} = useContext(ListContext);
  console.log('checked', checked);
  console.log('albuns', albuns);

  return (
    <div>
      <h1>{albuns}</h1>
    </div>
  );
}

export default Playlist;
