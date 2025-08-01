// ../api/student_axios.js
import axios from 'axios';

const studentAxios = axios.create({
  baseURL: 'http://localhost:8081/students', // ✅ Base path to /students
  withCredentials: true
});

export default studentAxios;
