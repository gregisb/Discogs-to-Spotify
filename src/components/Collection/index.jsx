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
    setFilteredAlbuns,
  } = useContext(ListContext);

  const [url, setUrl] = useState('');
  const [albuns, setAlbuns] = useState({});
  const [enableButton, setEnableButton] = useState(false);

  const scrollRef = useRef(null);

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

  const trackUri = [];
  const notFound = [];

  const handlePlaylistGeneration = (e) => {
    e.preventDefault();
    const results = {};
    Object.keys(albuns).forEach((album) => {
      results[album] = albuns[album].filter((track) => !discarted.includes(track.title));
    });
    setFilteredAlbuns(results);

    // console.log('1 - collection results', results);
    // console.log('2 - filteredAlbuns', filteredAlbuns);
    spotifyApi.setAccessToken(session.accessToken);
    Object.keys(results).map((albumTitle) => {
      const searchAlbumTitle = albumTitle;
      console.log(searchAlbumTitle);

      results[albumTitle].map((searchFilteredTrack) => {
        spotifyApi.searchTracks(`track:${searchFilteredTrack.title} album:${searchAlbumTitle}`)
          .then((data) => {
            // console.log(`Search tracks by "${searchFilteredTrack.title}" in the track name and "${searchAlbumTitle}" in the album name`, data.body);
            const myTracks = data.body.tracks.items;
            console.log('myTracks', myTracks);

            Object.keys(myTracks).map((myTrack) => {
              if (
                searchFilteredTrack.title.toLowerCase() === myTracks[myTrack].name.toLowerCase()
                && searchAlbumTitle.toLocaleLowerCase() === myTracks[myTrack].album.name.toLowerCase()) {
                console.log('myTrack[myTrack].name', myTracks[myTrack].name.toLowerCase());
                console.log('myTrack[myTrack].URI', myTracks[myTrack].uri);
                console.log('myTrack[myTrack].ALBUM', myTracks[myTrack].album.name.toLowerCase());
                trackUri.push(myTracks[myTrack].uri);
              } /* else {
                notFound.push(searchFilteredTrack.title);
                console.log('NÃO ADCIONADAS', notFound);
              } */
              return myTracks[myTrack].name;
            });
          }, (err) => {
            console.log('Something went wrong!', err);
          });
        // console.log('3 - FILTRO', searchFilteredTrack.title);
        return searchFilteredTrack;
      });
      return searchAlbumTitle;
    });
    console.log('trackURI', trackUri);

    router.push('/playlists');
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    // window.scrollTo({ top: scrollRef.current.scrollIntoView, behavior: 'smooth' });
  }, [albuns]);

  const {
    filteredAlbuns,
  } = useContext(ListContext);

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
        {enableButton ? <button className={styles.generatebutton} type="button" onClick={handlePlaylistGeneration}>Generate a playlist</button> : ''}
      </div>

    </>
  );
}
