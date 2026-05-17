export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN; // Vite exposes env variables prefixed with VITE_ to the browser at build time
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', // Tells the server to send the response in JSON format
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
  }
};