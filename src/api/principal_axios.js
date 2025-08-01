import axios from 'axios';

const principalAxios = axios.create({
  baseURL: 'http://localhost:8081/principals',
 withCredentials: true, // required for cookies to work with Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default principalAxios;
