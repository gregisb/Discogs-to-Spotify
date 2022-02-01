import React, { useContext } from 'react';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const {checked} = useContext(ListContext);
  console.log('playlist', checked);

  return (
    <div>
      <h1>{checked}</h1>
    </div>
  );
}

export default Playlist;
