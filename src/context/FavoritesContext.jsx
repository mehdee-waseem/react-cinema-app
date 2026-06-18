import { createContext, useContext, useEffect, useState } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../api';
import { getVisitorId } from '../utils/visitor';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const visitorId = getVisitorId();

  useEffect(() => {
    getFavorites(visitorId).then(setFavorites).catch(() => setFavorites([]));
  }, []);

  function isFavorite(movieId) {
    return favorites.some((m) => m.id === movieId);
  }

  async function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      await removeFavorite(visitorId, movie.id);
    } else {
      setFavorites((prev) => [movie, ...prev]);
      await addFavorite(visitorId, movie);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
