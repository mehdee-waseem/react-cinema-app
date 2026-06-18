import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="section">
      <div className="page-header">
        <h1>Your Favorites</h1>
        <p>Movies you've saved, kept on this device.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">♡</p>
          <p>Nothing saved yet. Tap the heart on any movie to add it here.</p>
          <Link to="/" className="btn-primary">Browse movies</Link>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
