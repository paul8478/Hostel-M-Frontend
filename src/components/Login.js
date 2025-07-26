import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post('/admins/login', { email, password });
     console.log('Login success', res.data);
      localStorage.setItem('admin', JSON.stringify(res.data)); // Save admin info
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err.response?.data || err.message);
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
