import axios from 'axios';

const principalAxios = axios.create({
  baseURL: 'http://localhost:8081/principals',
  withCredentials: true,
});

export default principalAxios;
