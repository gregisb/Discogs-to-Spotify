import React, { useState, useContext } from 'react';
import { ListContext, ListContextProvider } from '../../../context';
import styles from './home.module.scss';

function Playlist() {
  const { checked, albuns, tracksArray } = useContext(ListContext);
  console.log('checked', checked);
  // console.log('albuns', albuns);
  // console.log('tracksArray', tracksArray);

  const arrOfTracks = [];

  function tracksArr() {
    Object.keys(albuns).map((albumTitle) => {
      console.log('tracksArr', albumTitle);
      albuns[albumTitle].map((track) => {
        arrOfTracks.push(track.title);
      });
    });
    return arrOfTracks;
  }
  tracksArr();
  console.log('ARROFTRACKS', arrOfTracks);

  let filteredSongs = [];
  filteredSongs = arrOfTracks.filter((currentSong) => !checked.includes(currentSong));
  console.log('filteredSongsDENTRO ', filteredSongs);
  console.log(`tipo${typeof filteredSongs}`);

  console.log('filteredSongsFORA ', filteredSongs);

  return (
    <div>
      {Object.keys(albuns).map((albumTitle) => (
        <div key={albumTitle}>
          <div className={styles.album}>
            <p>
              {albumTitle}

              {/* {filter()} */}
            </p>

          </div>

          <ol>
            {filteredSongs.map((track) => (
              <div className={styles.songs}>
                <li key={track} track={track}>
                  {track}

                </li>
              </div>
            ))}
          </ol>

        </div>
      ))}
    </div>
  );
}

export default Playlist;
