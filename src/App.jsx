import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import { GenreProvider } from './context/GenreContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <GenreProvider>
      <FavoritesProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </GenreProvider>
  );
}

export default App;
