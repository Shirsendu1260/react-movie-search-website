# React Movie Search

A movie search website built with React and the TMDB API.
Live URL: 

## Tech

- React 19
- Vite
- Tailwind CSS v4
- TMDB API

## Features

- Search movies with debounced input (no API call on every keystroke)
- Browse popular movies with pagination
- Trending movies of the day
- Trending Indian movies section

## Getting started

You'll need a free TMDB account to get an API key, get it from [themoviedb.org](https://www.themoviedb.org/).

```bash
git clone https://github.com/Shirsendu1260/react-movie-search-website.git
cd react-movie-search-website
npm install
```

Copy the env file and add your credentials:

```bash
cp .env.example .env
```

```env
VITE_TMDB_API_READ_ACCESS_TOKEN=your_tmdb_api_read_access_token
VITE_TMDB_API_KEY=your_tmdb_api_key
```

```bash
npm run dev
```