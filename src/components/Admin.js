import React, { useEffect, useState } from 'react';
import { getAllAdmins, createAdmin } from '../services/adminService'; 
import '../css/sidebar.css';
import '../css/student.css';

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    permission: ''
  });

  const [search, setSearch] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    getAllAdmins()
      .then(response => {
        setAdmins(response.data);
        setFilteredAdmins(response.data); // Default list
      })
      .catch(err => {
        setError('Failed to fetch admins');
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = admins.filter(admin =>
      admin.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAdmins(results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAdmin(formData)
      .then(() => {
        setFormData({ name: '', email: '', password: '', permission: '' });
        fetchAdmins();
      })
      .catch(err => {
        setError('Failed to add admin');
        console.error(err);
      });
  };

  return (
    <div className="box">
      <h1>Admin Data</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add Admin Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="permission" placeholder="Permission" value={formData.permission} onChange={handleChange} required />
        <button type="submit">Add Admin</button>
      </form>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="admin-form">
        <input type="text" placeholder="Search by email" value={search} onChange={handleSearchChange} />
        <button type="submit">Search Admin</button>
      </form>

      {/* Admin Table */}
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Permission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.password}</td>
              <td>{admin.permission}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
