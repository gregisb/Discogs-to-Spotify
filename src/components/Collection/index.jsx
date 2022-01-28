import React, { useState } from 'react';

import { BsSearch } from 'react-icons/bs';
import styles from './home.module.scss';

const axios = require('axios');

function Collection() {
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
        console.log(tempAlbuns);

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    getAlbuns();
  };

  return (
    <>
      <div className={styles.container}>
        <form>
          <label className={styles.label}>Link your Discogs collection</label>
          <input onChange={(e) => setUrl(e.target.value)} value={url} type="text" />
          <button onClick={onSubmit}>Import list</button>
        </form>
      </div>

      <div>
        {Object.keys(albuns).map((albumTitle, index) => (
          <div key={index}>
            <div className={styles.album}>
              <input type="checkbox" checked />
              <p>
                {albumTitle}
              </p>
            </div>
            <ol>
              {albuns[albumTitle].map((track, index2) => (
                <div className={styles.songs}>
                  <li key={index2}>{track.title}</li>
                  <label className={styles.switch}>
                    <input type="checkbox" checked />
                  </label>
                </div>
              ))}
            </ol>
          </div>
        ))}
      </div>

    </>
  );
}

export default Collection;
