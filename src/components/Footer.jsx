export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">MARQUEE</p>
          <p>A small movie discovery site, built as a personal project.</p>
        </div>
        <div>
          <p className="footer-heading">Data</p>
          <p>
            Movie data and images provided by{' '}
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
              TMDB
            </a>
            . This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Marquee</span>
      </div>
    </footer>
  );
}
