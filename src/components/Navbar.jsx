import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useFavorites();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">M</span>
          <span className="brand-name">MARQUEE</span>
        </Link>

        <Link to="/favorites" className="favorites-link">
          ♡ Favorites
          {favorites.length > 0 && <span className="favorites-count">{favorites.length}</span>}
        </Link>
      </div>
    </header>
  );
}
