import { Link } from 'react-router-dom';
import { useGenres } from '../context/GenreContext';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const { getGenreNames } = useGenres();
  const { isFavorite, toggleFavorite } = useFavorites();

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '';
  const genreNames = getGenreNames(movie.genre_ids).slice(0, 2);
  const favorited = isFavorite(movie.id);

  function handleFavoriteClick(e) {
    e.preventDefault(); // don't follow the card link
    toggleFavorite(movie);
  }

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
        ) : (
          <div className="poster-fallback">🎬</div>
        )}

        <button
          className={`favorite-btn ${favorited ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorited ? '♥' : '♡'}
        </button>

        {movie.vote_average > 0 && (
          <span className="rating-badge">★ {movie.vote_average.toFixed(1)}</span>
        )}
      </div>

      <div className="movie-card-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">
          {year}
          {genreNames.length > 0 ? ` · ${genreNames.join(', ')}` : ''}
        </p>
      </div>
    </Link>
  );
}
