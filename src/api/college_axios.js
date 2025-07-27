import axios from 'axios';

const collegeAxios = axios.create({
  baseURL: 'http://localhost:8081/colleges', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default collegeAxios;
