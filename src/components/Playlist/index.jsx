import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const { filteredAlbuns, trackUri } = useContext(ListContext);
  // console.log('playlists', filteredAlbuns);

  const spotifyApi = new SpotifyWebApi();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [playlistTitle, setPlaylistTitle] = useState('');

  console.log('Playlists: trackUri', trackUri);

  function onSubmit(e) {
    e.preventDefault();
    spotifyApi.setAccessToken(session.accessToken);

    spotifyApi.createPlaylist(playlistTitle, { description: 'Generated by Discogs to Spotify', public: true })
      .then((data) => {
        console.log('Created playlist!');
      }, (err) => {
        console.log('Something went wrong!', err);
      }).then((data) => {
        spotifyApi.getUserPlaylists(session.userName)
          .then((userData) => {
            console.log('Retrieved playlists', userData.body);
            const userPlaylists = userData.body.items;
            console.log('PLAYLIST ID', userPlaylists);
            return userPlaylists;
          }, (err) => {
            console.log('Something went wrong!', err);
          }).then((userPlaylists) => {
            Object.keys(userPlaylists).map((playlistId) => {
              if (playlistTitle === userPlaylists[playlistId].name && userPlaylists[playlistId].description === 'Generated by Discogs to Spotify') {
                const userPlaylistId = userPlaylists[playlistId].id;
                console.log('IDSSS', userPlaylistId);
                spotifyApi.addTracksToPlaylist(userPlaylistId, trackUri)
                  .then((data) => {
                    console.log('Added tracks to playlist!');
                  }, (err) => {
                    console.log('Something went wrong!', err);
                  });
              }
            });
          }, (err) => {
            console.log('uri error', err);
          });
      });
  }

  return (
    <div className={styles.container}>
      {/* <p>You've selected the following tracks to be add to the new playlist:</p> */}
      {/* <div className={styles.songs}>
        {Object.keys(filteredAlbuns).map((albumTitle) => (

          <ul>
            {filteredAlbuns[albumTitle].map((filteredTracks) => (
              <li>{filteredTracks.title}</li>
            ))}

          </ul>
        ))}
      </div> */}
      <form>
        <label className={styles.label}>Give your playlist a name: </label>
        <input
          id="text"
          type="text"
          onChange={(e) => setPlaylistTitle(e.target.value)}
          value={playlistTitle}
          placeholder="Playlist title"
          autoComplete="off"
        />
        <button className={styles.generatebutton} type="button" onClick={onSubmit}>Create new playlist</button>

      </form>
    </div>
  );
}

export default Playlist;
