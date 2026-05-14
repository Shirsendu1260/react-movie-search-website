import { useState } from 'react'
import './App.css'
import heroSrc from '../public/hero.png';
import Search from './components/Search.jsx';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />

      <div className='wrapper'>
        <header>
          <img src={heroSrc} alt="Hero Banner" className='mb-5' />
          <h1>Find <span className='text-gradient'>Movies</span> You Like</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  );
}

export default App
