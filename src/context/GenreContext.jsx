import { createContext, useContext, useEffect, useState } from 'react';
import { getGenres } from '../api';

const GenreContext = createContext({ genres: [], getGenreNames: () => [] });

export function GenreProvider({ children }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setGenres([]));
  }, []);

  function getGenreNames(ids = []) {
    return ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean);
  }

  return (
    <GenreContext.Provider value={{ genres, getGenreNames }}>
      {children}
    </GenreContext.Provider>
  );
}

export function useGenres() {
  return useContext(GenreContext);
}
