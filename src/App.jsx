import { useState, useEffect } from 'react'
import './App.css'
import heroSrc from '../public/hero.png';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import Footer from './components/Footer.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN; // Vite exposes env variables prefixed with VITE_ to the browser at build time
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', // API sends JSON response
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    // Before fetching starts, start loading
    setIsLoading(true);
    setErrorMsg('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error(`Failed to fetch movies. Status: ${response.status}`);
      }

      const data = await response.json();

      if(data.success === false) {
        setErrorMsg(data.status_message || 'Failed to fetch movies.');
        setMovies([]);
        throw new Error(data.status_message || 'Failed to fetch movies.');
      }

      setMovies(data.results || []);
    }
    catch(error) {
      console.error(`Error while fetching movies: ${error.message || error}`);
      setErrorMsg('Error while fetching movies. Please try again later.');
    }
    finally {
      // Whether we succeed or failed, stop loading
      setIsLoading(false);
    }
  };

  // Runs only (because of the empty dependency array, []) when this components loads 
  // for the very first time
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className='wrapper'>
        <header>
          <img src={heroSrc} alt="Hero Banner" className='mb-5' />
          <h1>Find <span className='text-gradient'>Movies</span> You Like</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px] text-center'>All Movies</h2>

          <div className='flex flex-col justify-center'>
            {isLoading ? (
              <Spinner />
            ) : errorMsg ? (
              <p className='text-red-500'>{errorMsg}</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default App
