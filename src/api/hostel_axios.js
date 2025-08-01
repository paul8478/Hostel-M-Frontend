
import axios from 'axios';

const hostelAxios = axios.create({
  baseURL: 'http://localhost:8081/hostels',
  withCredentials: true
});

export default hostelAxios;
