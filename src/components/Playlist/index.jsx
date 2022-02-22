import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { AiOutlineCopy } from 'react-icons/ai';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Iframe({
  src, height, width, title,
}) {
  const embedLink = src.replace('open.spotify.com', 'open.spotify.com/embed');
  return (
    <div>
      <iframe
        src={embedLink}
        height={height}
        width={width}
        title={title}
        allowtransparency="true"
        allow="encrypted-media"
      />
    </div>
  );
}

function Playlist() {
  const { filteredAlbuns, trackUri } = useContext(ListContext);
  // console.log('playlists', filteredAlbuns);

  const spotifyApi = new SpotifyWebApi();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [playlistTitle, setPlaylistTitle] = useState('');

  const [listExists, setlistExists] = useState(false);

  const [getPlaylistTracks, setGetPlaylistTracks] = useState();

  const [playlistLink, setPlaylistLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    if (playlistTitle === '') {
      setErrorMessage('You need to provide a name to yout playlist!');
      return;
    }
    spotifyApi.setAccessToken(session.accessToken);
    setErrorMessage('');

    spotifyApi.createPlaylist(playlistTitle, { description: 'Generated by Discogs to Spotify', public: true })
      .then((data) => {
        console.log('data', data);
        const userPlaylistId = data.body.id;

        spotifyApi.addTracksToPlaylist(userPlaylistId, trackUri)
          .then((_newSnapshotId) => {
            spotifyApi.getPlaylist(userPlaylistId)
              .then((newUserPlaylist) => {
                setPlaylistLink(newUserPlaylist.body.external_urls.spotify);
                setGetPlaylistTracks(newUserPlaylist.body.tracks.items);
              }, (err) => {
                console.log('Something went wrong!', err);
              }).then(() => {
                setlistExists(true);
              }, (err) => {
                console.log(err);
              });
          });
      });
  }

  return listExists ? (
    <div className={styles.Content}>
      <div className={styles.newPlaylistHeader}>
        <h1>
          Your new playlist has been created!
        </h1>
        {/*
        <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"></iframe>
        */}
        <Iframe title="Spotify Playlist" src={playlistLink} height="380" width="300" />
        <div className={styles.clipboard}>
          <p>{playlistLink}</p>
          <AiOutlineCopy onClick={() => setUrl('https://www.discogs.com/lists/Eletr%C3%B4nica/941179')} />
        </div>
      </div>

    </div>

  ) : (
    <div className={styles.container}>
      <h1>
        Create a new
        {' '}
        <span>Spotify</span>
        {' '}
        playlist

      </h1>
      <form>
        <label className={styles.label}>Give your playlist a name: </label>
        <input
          id="text"
          type="text"
          onChange={(e) => setPlaylistTitle(e.target.value)}
          value={playlistTitle}
          placeholder="Playlist title"
          autoComplete="off"
          required
        />
        <p className={styles.errorMessage}>{errorMessage}</p>
        <button className={styles.generatebutton} type="button" onClick={onSubmit}>Create new playlist</button>

      </form>
    </div>
  );
}

export default Playlist;
