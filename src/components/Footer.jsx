import tmdbLogo from '../../public/tmdb.svg';

const Footer = () => {
  return (
    <footer className="w-full mt-15 py-5 border-t border-white/10 flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <img src={tmdbLogo} alt="TMDB Logo" className="h-5" />
        <p className="text-sm text-gray-400">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
      <p className="text-xs text-gray-600">
        Movie data provided by{' '}
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white underline transition-colors"
        >
          The Movie Database (TMDB)
        </a>
      </p>
    </footer>
  );
};

export default Footer;