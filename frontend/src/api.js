import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

// Add a request interceptor to add the token to all requests
API.interceptors.request.use(config => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const token = JSON.parse(userData).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default API;