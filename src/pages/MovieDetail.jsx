import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovie } from '../api';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getMovie(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <section className="section"><p className="status-text">Loading...</p></section>;
  if (error) return <section className="section"><p className="status-text error">{error}</p></section>;
  if (!movie) return null;

  const favorited = isFavorite(movie.id);

  function handleToggleFavorite() {
    toggleFavorite({
      id: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      backdropUrl: movie.backdropUrl,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genre_ids: (movie.genres || []).map((g) => g.id),
    });
  }

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <>
      <div
        className="detail-banner"
        style={{ backgroundImage: movie.backdropUrl ? `url(${movie.backdropUrl})` : 'none' }}
      ></div>

      <section className="section">
        <Link to="/" className="back-link">&larr; Back to all movies</Link>

        <div className="detail-layout">
          <div className="detail-poster">
            {movie.posterUrl ? (
              <img src={movie.posterUrl} alt={movie.title} />
            ) : (
              <div className="poster-fallback">🎬</div>
            )}
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}

            <p className="movie-meta">
              {movie.release_date?.slice(0, 4)}
              {movie.runtime ? ` · ${hours}h ${minutes}m` : ''}
              {movie.vote_average > 0 ? ` · ★ ${movie.vote_average.toFixed(1)}` : ''}
            </p>

            {movie.genres?.length > 0 && (
              <div className="genre-tags">
                {movie.genres.map((g) => (
                  <span className="genre-tag" key={g.id}>{g.name}</span>
                ))}
              </div>
            )}

            <p className="detail-synopsis">{movie.overview}</p>

            <button
              className={`btn-favorite ${favorited ? 'favorited' : ''}`}
              onClick={handleToggleFavorite}
            >
              {favorited ? '♥ Saved to favorites' : '♡ Add to favorites'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
