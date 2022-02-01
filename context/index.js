import { createContext } from 'react';

export const ListContext = createContext({});

export function ListContextProvider({ children }) {
  const test = 'test';
  console.log('CONTEXT', test);
  return (
    <ListContext.Provider value={{test}}>{children}</ListContext.Provider>
  );
}
