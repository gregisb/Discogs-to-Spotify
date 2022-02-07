import React, { useContext, useState } from 'react';

import Switch from '@mui/material/Switch';

import { useRouter } from 'next/router';
import styles from './home.module.scss';

import { ListContext } from '../../../context';

const axios = require('axios');

export default function CollectionPreviwer() {
  const {
    setFilteredAlbuns,
  } = useContext(ListContext);

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

  const tracksArray = [];

  const [discarted, setdiscarted] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = discarted.indexOf(value);
    const newdiscarted = [...discarted];

    if (currentIndex === -1) {
      newdiscarted.push(value);
    } else {
      newdiscarted.splice(currentIndex, 1);
    }

    setdiscarted(newdiscarted);
  };

  const router = useRouter();

  const handlePlaylistGeneration = (e) => {
    e.preventDefault();
    const results = {};
    Object.keys(albuns).forEach((album) => {
      results[album] = albuns[album].filter((track) => !discarted.includes(track.title));
      setFilteredAlbuns(results);
      console.log('collection', results);
      router.push('/playlists');
    });
  };
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
            <ul>
              {albuns[albumTitle].map((track) => (
                <div className={styles.songs}>
                  {tracksArray.push(track.title)}
                  <li key={track.title} track={track.title}>

                    {track.title}
                    <Switch
                      onChange={() => handleToggle(`${track.title}`)}
                      checked={!discarted.includes(`${track.title}`)}
                      size="small"
                    />
                  </li>
                </div>
              ))}
            </ul>

          </div>
        ))}
        <button type="button" onClick={handlePlaylistGeneration}>Generate a playlist</button>
      </div>

    </>
  );
}
