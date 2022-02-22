import React, {
  useContext, useState, useEffect, useRef,
} from 'react';

import { AiOutlineCopy } from 'react-icons/ai';

import Switch from '@mui/material/Switch';

import { useRouter } from 'next/router';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSession } from 'next-auth/react';
import styles from './home.module.scss';

import { ListContext } from '../../../context';

const axios = require('axios');

export default function CollectionPreviwer() {
  const spotifyApi = new SpotifyWebApi();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const {
    setFilteredAlbuns, setTrackUri,
  } = useContext(ListContext);

  const [url, setUrl] = useState('');
  const [albuns, setAlbuns] = useState({});
  const [enableButton, setEnableButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollRef = useRef(null);

  const discogsUrl = 'https://api.discogs.com';

  const onSubmit = (e) => {
    e.preventDefault();

    if (url === '') {
      setErrorMessage('You need to provide a link to a Discogs list!');
      return;
    }
    setErrorMessage('');

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
        setEnableButton(true);

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

  const collectionUris = [];

  const handlePlaylistGeneration = (e) => {
    e.preventDefault();
    const results = {};
    const notFound = [];

    Object.keys(albuns).forEach((album) => {
      results[album] = albuns[album].filter((track) => !discarted.includes(track.title));
    });
    setFilteredAlbuns(results);

    spotifyApi.setAccessToken(session.accessToken);
    Object.keys(results).forEach((albumTitle) => {
      results[albumTitle].forEach((track) => {
        // TODO: avaliar inclusão do artista na busca
        spotifyApi.searchTracks(`track:${track.title} album:${albumTitle}`)
          .then((data) => {
            const spotifyTracks = data.body.tracks.items;
            console.log('spotifyTracks', spotifyTracks);

            Object.keys(spotifyTracks).forEach((spotifyTrack) => {
              if (
                track.title.toLowerCase() === spotifyTracks[spotifyTrack].name.toLowerCase()
                && albumTitle.toLocaleLowerCase()
                === spotifyTracks[spotifyTrack].album.name.toLowerCase()) {
                collectionUris.push(spotifyTracks[spotifyTrack].uri);
                setTrackUri(collectionUris);
              } else {
                notFound.push(track.title);
                console.log('NÃO ADCIONADAS', notFound);
              }
            });
          }, (err) => {
            console.log('Something went wrong!', err);
          });
      });
    });

    router.push('/playlists');
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo({ top: scrollRef.current.scrollIntoView, behavior: 'smooth' });
  }, [albuns]);

  return (
    <>
      <div className={styles.container}>
        <p className={styles.paragraph}>
          Go to your Discogs lists and choose one to import.
          You can use the following link as an example:
        </p>
        <div className={styles.clipboard}>
          <p>https://www.discogs.com/lists/Eletr%C3%B4nica/941179</p>
          <AiOutlineCopy onClick={() => setUrl('https://www.discogs.com/lists/Eletr%C3%B4nica/941179')} />
        </div>
        <form>
          <label className={styles.label}>Link your Discogs list:</label>
          <input
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            type="text"
            placeholder="Place here the link to your Discogs list"
            autoComplete="off"
          />
          <p className={styles.errorMessage}>{errorMessage}</p>
          <button type="button" onClick={onSubmit}>Import list</button>

        </form>
      </div>

      <div ref={scrollRef}>
        {Object.keys(albuns).map((albumTitle) => (
          <div className="album1" key={albumTitle}>
            <div className={styles.album}>
              <p>
                {albumTitle}
              </p>

            </div>
            <div>
              {/* TODO: create react component track selector table */}
              {albuns[albumTitle].map((track) => (
                <div className={styles.songs}>
                  <ul>
                    <li key={track.title} track={track.title}>

                      {track.title}

                      <Switch
                        onChange={() => handleToggle(`${track.title}`)}
                        checked={!discarted.includes(`${track.title}`)}
                        size="small"
                      />
                    </li>
                  </ul>
                </div>
              ))}
            </div>

          </div>
        ))}
        {enableButton ? <button className={styles.generatebutton} type="button" onClick={handlePlaylistGeneration}>Generate a playlist</button> : ''}
      </div>

    </>
  );
}
