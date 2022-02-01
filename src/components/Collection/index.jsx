import React, { useState, useContext } from 'react';
import Switch from '@mui/material/Switch';

import styles from './home.module.scss';

import { ListContext } from '../../../context';

const axios = require('axios');

function CollectionPreviwer() {
  const {
    url,
    setUrl,
    albuns,
    discogsUrl,
    onSubmit,
    checked,
    handleToggle,
  } = useContext(ListContext);

  return (
    <>
      <div className={styles.container}>
        <form>
          <label className={styles.label}>Link your Discogs collection</label>
          <input onChange={(e) => setUrl(e.target.value)} value={url} type="text" />
          <button type="button" onClick={onSubmit}>Import list</button>
        </form>
      </div>

      <div>
        {Object.keys(albuns).map((albumTitle) => (
          <div key={albumTitle}>
            <div className={styles.album}>
              <p>
                {albumTitle}
              </p>

            </div>
            <ol>
              {albuns[albumTitle].map((track) => (
                <div className={styles.songs}>
                  <li key={track.title} track={track.title}>
                    {track.title}
                    <Switch
                      onChange={() => handleToggle(albumTitle + track.title)}
                      checked={!checked.includes(albumTitle + track.title)}
                      size="small"
                    />
                  </li>
                </div>
              ))}
            </ol>

          </div>
        ))}
        <button type="button" onClick={onSubmit}>Generate a playlist</button>
      </div>

    </>
  );
}

export default CollectionPreviwer;
