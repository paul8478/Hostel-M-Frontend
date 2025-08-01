import axios from '../api/hostel_axios';

export const getAllHostels = () => axios.get('/'); 
export const createHostels = (student) => axios.post('/', student); 

export const getHostelById = (id) => axios.get(`/${id}`); 
export const deleteHostel = (id) => axios.delete(`/${id}`);
