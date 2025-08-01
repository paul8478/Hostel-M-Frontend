import axios from '../api/student_axios';

export const getAllStudents = () => axios.get('/'); // GET /students
export const createStudent = (student) => axios.post('/', student); // POST /students

export const getStudentById = (id) => axios.get(`/${id}`); // GET /students/{id}
export const deleteStudent = (id) => axios.delete(`/${id}`);
