import React, { useContext } from 'react';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const {test} = useContext(ListContext);
  console.log('playlist', test);

  return (
    <div>
      <h1>{test}</h1>
    </div>
  );
}

export default Playlist;
