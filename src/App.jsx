import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search.jsx';
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import TrendingMovieCard from './components/TrendingMovieCard.jsx';
import Footer from './components/Footer.jsx';
import { API_BASE_URL, API_READ_ACCESS_TOKEN, API_OPTIONS } from './constants.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [trendingMoviesOfTheDay, setTrendingMoviesOfTheDay] = useState([]);
  const [trendingIndianMovies, setTrendingIndianMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useRef gives a way to directly access a DOM element from React code — like grabbing it 
  // with document.getElementById() but the React way.
  const trendingIndiaRef = useRef(null);
  const trendingTodayRef = useRef(null);

  const scrollSection = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };
  // .current is the actual DOM element. We can call any native DOM method on it — in our case 
  // scrollBy().
  // Unlike useState, changing a ref does not re-render the component. It's just a direct 
  // reference to the element sitting in the DOM.
  // ref.current.scrollBy() is a plain browser DOM method — nothing React-specific. useRef just gave 
  // us the handle to call it on the right element.

  const fetchMovies = async (query = '', page = 1) => {
    // Before fetching starts, start loading
    setIsLoading(true);
    setErrorMsg('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
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
      setTotalPages(data.total_pages || 1);
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

  const fetchTrendingMoviesOfTheDay = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trending/movie/day`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trending movies of the day.');
      }

      const data = await response.json();

      setTrendingMoviesOfTheDay(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTrendingIndianMovies = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/discover/movie?region=IN&sort_by=popularity.desc&with_origin_country=IN&vote_count.gte=100&page=1`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error('Failed to fetch currently trending movies in India.');
      }

      const data = await response.json();

      setTrendingIndianMovies(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Debounce the search input to avoid firing an API call on every keystroke.
  // Instead, we wait until the user pauses typing for 500ms, then update
  // debouncedSearchTerm, which is what actually triggers the API fetch.
  useDebounce(
    () => setDebouncedSearchTerm(searchTerm), // the function to run after the delay
    500, // wait 500ms (half a second) of inactivity before running it
    [searchTerm] // dependency array, re-starts the timer every time searchTerm changes
  );

  // 1. THE TRIGGER: User types 'N'. 
  //    A 500ms timer starts immediately.
  // 2. THE RESET: User types 'o' after 200ms. 
  //    The old timer is killed; a fresh 500ms timer starts. 
  //    As long as they keep typing, the function stays "paused."
  // 3. THE PAYLOAD: User pauses for > 500ms. 
  //    The timer completes, setDebouncedSearchTerm runs, 
  //    and the API is called exactly once with the full word.

  // Runs only when this components loads for the very first time
  // and when 'debouncedSearchTerm' changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    fetchTrendingMoviesOfTheDay();
    fetchTrendingIndianMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className='wrapper'>
        <header>
          <h1>Find <span className='text-gradient'>Movies</span> You Like</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingIndianMovies.length > 0 && (
          <section className='trending'>
            <div className='trending-header'>
              <h2>Trending in India</h2>
              <div className='scroll-btns'>
                <button className='scroll-btn' onClick={() => scrollSection(trendingIndiaRef, 'left')}>&#8592;</button>
                <button className='scroll-btn' onClick={() => scrollSection(trendingIndiaRef, 'right')}>&#8594;</button>
              </div>
            </div>
 
            <ul ref={trendingIndiaRef}>
              {trendingIndianMovies.map((movie, index) => (
                <li key={movie.id}>
                  <TrendingMovieCard movie={movie} index={index} />
                </li>
              ))}
            </ul>
          </section>
        )}
 
        {trendingMoviesOfTheDay.length > 0 && (
          <section className='trending'>
            <div className='trending-header'>
              <h2>Trending Movies of Today</h2>
              <div className='scroll-btns'>
                <button className='scroll-btn' onClick={() => scrollSection(trendingTodayRef, 'left')}>&#8592;</button>
                <button className='scroll-btn' onClick={() => scrollSection(trendingTodayRef, 'right')}>&#8594;</button>
              </div>
            </div>
 
            <ul ref={trendingTodayRef}>
              {trendingMoviesOfTheDay.map((movie, index) => (
                <li key={movie.id}>
                  <TrendingMovieCard movie={movie} index={index} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 className='mt-[40px] mb-[40px] text-center'>All Movies</h2>

          {isLoading ? (
            <div className='flex justify-center mt-10'>
              <Spinner />
            </div>
          ) : errorMsg ? (
            <p className='text-red-500 text-center mt-10'>{errorMsg}</p>
          ) : (
            <>
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>

              <div className='pagination'>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>

                <span>
                  {currentPage}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default App
