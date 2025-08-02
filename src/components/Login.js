import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../api/admin_axios';
import '../components/Login.css'; // Already present

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await adminAxios.post('/login', { email, password });
      const user = response.data.user || response.data;

      if (user && Object.keys(user).length > 0) {
        if (rememberMe) {
          localStorage.setItem('principalData', JSON.stringify(user));
        } else {
          sessionStorage.setItem('principalData', JSON.stringify(user));
        }

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
    <div className="login-box">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
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
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="toggle-password-btn"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <br />

        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
