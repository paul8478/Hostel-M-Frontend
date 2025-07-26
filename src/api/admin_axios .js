import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8081/admins',
   withCredentials: true, // required for cookies to work with Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },  // Your backend base URL + controller mapping

});
