import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/', // replace with your backend URL
  withCredentials: true, // required for cookies to work with Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
