import axios from 'axios';

const adminAxios = axios.create({
  baseURL: 'http://localhost:8081/admins',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default adminAxios;
