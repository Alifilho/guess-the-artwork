import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bepeoh.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;