import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

import styles from './home.module.scss';

const axios = require('axios');

function CollectionPreviwer() {
  const [url, setUrl] = useState('');
  const [albuns, setAlbuns] = useState({});

  const discogsUrl = 'https://api.discogs.com';

  const onSubmit = (e) => {
    e.preventDefault();

    const listId = url.split('/').pop();

    const tempAlbuns = [];

    const getAlbuns = async () => {
      try {
        const resp = await axios.get(`${discogsUrl}/lists/${listId}`);
        const data = resp.data.items;

        for (let i = 0; i < data.length; i++) {
          const album = await axios.get(data[i].resource_url);
          tempAlbuns[album.data.title] = album.data.tracklist;
        }
        setAlbuns(tempAlbuns);

        return data;
      } catch (error) {
        console.log(error);
      }
      return null;
    };

    getAlbuns();
  };

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log(checked);

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
