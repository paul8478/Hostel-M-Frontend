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

      // ✅ Extract permission from response
      const { permission } = response.data;

      // ✅ Redirect based on permission
      if (permission === 'ALL') {
        navigate('/super-admin-dashboard');
      } else if (permission === 'VIEW_ONLY' || permission === 'EDIT') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials or server error.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label><br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
