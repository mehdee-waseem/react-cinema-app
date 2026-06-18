import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { getMovies, searchMovies } from '../api';
import { useGenres } from '../context/GenreContext';

const TABS = [
  { key: 'now_playing', label: 'Now Showing' },
  { key: 'upcoming', label: 'Coming Soon' },
  { key: 'popular', label: 'Popular' },
  { key: 'top_rated', label: 'Top Rated' },
];

export default function Home() {
  const { genres } = useGenres();

  const [category, setCategory] = useState('now_playing');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [featured, setFeatured] = useState(null);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [genreId, setGenreId] = useState('all');

  // featured banner movie, independent of whichever tab is active
  useEffect(() => {
    getMovies('popular')
      .then((data) => setFeatured(data[0] || null))
      .catch(() => setFeatured(null));
  }, []);

  // load the active tab's movies
  useEffect(() => {
    setLoading(true);
    setError('');
    getMovies(category)
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  // live search, with a short debounce so we're not hitting the API on every keystroke
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(() => {
      searchMovies(search)
        .then(setSearchResults)
        .catch((err) => setError(err.message));
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const displayedMovies = useMemo(() => {
    const list = searchResults !== null ? searchResults : movies;
    if (genreId === 'all') return list;
    return list.filter((m) => m.genre_ids?.includes(Number(genreId)));
  }, [movies, searchResults, genreId]);

  const isSearching = searchResults !== null;

  return (
    <>
      {featured && (
        <section
          className="hero"
          style={{ backgroundImage: featured.backdropUrl ? `url(${featured.backdropUrl})` : 'none' }}
        >
          <div className="hero-overlay">
            <p className="hero-eyebrow">Picked by our projectionist</p>
            <h1 className="hero-title">{featured.title}</h1>
            <p className="hero-overview">{featured.overview}</p>
            <Link to={`/movies/${featured.id}`} className="btn-primary">
              See details
            </Link>
          </div>
        </section>
      )}

      <section className="section">
        <div className="filters">
          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={!isSearching && category === t.key ? 'active' : ''}
                onClick={() => {
                  setSearch('');
                  setCategory(t.key);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search any movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {genres.length > 0 && (
          <div className="genre-chips">
            <button className={`chip ${genreId === 'all' ? 'chip-active' : ''}`} onClick={() => setGenreId('all')}>
              All genres
            </button>
            {genres.map((g) => (
              <button
                key={g.id}
                className={`chip ${genreId === String(g.id) ? 'chip-active' : ''}`}
                onClick={() => setGenreId(String(g.id))}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}

        {loading && !isSearching && <p className="status-text">Loading movies...</p>}
        {error && <p className="status-text error">{error}</p>}

        {!loading && !error && displayedMovies.length === 0 && (
          <p className="status-text">Nothing here yet - try a different tab or search.</p>
        )}

        {!error && displayedMovies.length > 0 && (
          <div className="movie-grid">
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
