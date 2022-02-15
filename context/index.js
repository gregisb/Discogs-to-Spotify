import React, { useState, createContext, useMemo } from 'react';

export const ListContext = createContext({});

export function ListContextProvider({ children }) {
  const [filteredAlbuns, setFilteredAlbuns] = useState({});
  const [trackUri, setTrackUri] = useState([]);

  return (
    <ListContext.Provider
      value={{
        filteredAlbuns,
        setFilteredAlbuns,
        setTrackUri,
        trackUri,
      }}
    >
      {children}

    </ListContext.Provider>
  );
}
