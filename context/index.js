import React, { useState, createContext, useMemo } from 'react';

const axios = require('axios');

export const ListContext = createContext({});

export function ListContextProvider({ children }) {
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

  let tracksArray = [];

  const [checked, setChecked] = useState([]);
  // const checkMemo = useMemo(() => [checked], [checked]);

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

  return (
    <ListContext.Provider
      value={{
        // checkMemo,
        url,
        setUrl,
        albuns,
        discogsUrl,
        onSubmit,
        checked,
        setChecked,
        handleToggle,
        tracksArray,
      }}
    >
      {children}

    </ListContext.Provider>
  );
}
