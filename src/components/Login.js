import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../api/admin_axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await adminAxios.post('/login', { email, password });
      console.log('Login response:', response.data);

      // Assuming backend returns user data either inside 'user' or directly
      const user = response.data.user || response.data;

      if (user && Object.keys(user).length > 0) {
        // Store user data in sessionStorage
        sessionStorage.setItem('principalData', JSON.stringify(user));
        console.log('Stored principalData:', sessionStorage.getItem('principalData'));

        // Navigate based on permission
        const permission = user.permission || response.data.permission || '';
        if (permission === 'VIEW_ONLY' || permission === 'EDIT') {
          navigate('/principal-dashboard');
        } else if (permission === 'ALL') {
          navigate('/super-admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setError('Login failed: user data missing.');
      }
    } catch (err) {
      setError('Invalid credentials or server error.');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
