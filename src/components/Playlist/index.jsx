import React, { useState, useContext } from 'react';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const { checkMemo, setChecked } = useContext(ListContext);
  console.log('playlist', checkMemo);

  return (
    <div>
      <h1>{checkMemo}</h1>
    </div>
  );
}

export default Playlist;
