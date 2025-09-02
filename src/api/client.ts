import axios from 'axios';
import { BASE_URL } from '../config/env';

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});
