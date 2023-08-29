import axios from 'axios';

const API_URL = 'http://localhost:4500';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (userData) => {
  try {
    const response = await api.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/api/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};