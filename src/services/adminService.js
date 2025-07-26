import axios from '../api/admin_axios ';
import Admin from '../components/Admin';

export const getAllAdmins = () => axios.get('');

export const createAdmin = (admin) => axios.post('', admin);
