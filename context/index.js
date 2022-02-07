import React, { useState, createContext, useMemo } from 'react';

export const ListContext = createContext({});

export function ListContextProvider({ children }) {
  const [filteredAlbuns, setFilteredAlbuns] = useState({});

  return (
    <ListContext.Provider
      value={{
        filteredAlbuns,
        setFilteredAlbuns,
      }}
    >
      {children}

    </ListContext.Provider>
  );
}
