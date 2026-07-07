import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://sme-higt.onrender.com',
});