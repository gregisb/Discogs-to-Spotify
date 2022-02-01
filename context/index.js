import React, { useState, createContext } from 'react';

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
    <ListContext.Provider value={{
      url,
      setUrl,
      albuns,
      discogsUrl,
      onSubmit,
      checked,
      handleToggle,
    }}
    >
      {children}

    </ListContext.Provider>
  );
}
