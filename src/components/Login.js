import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxios from '../api/admin_axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  // Add keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(66, 204, 162, 0.3); }
        50% { box-shadow: 0 0 30px rgba(66, 204, 162, 0.6), 0 0 40px rgba(25, 94, 157, 0.4); }
      }
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at top left, #42CCA2 0%, transparent 50%), radial-gradient(circle at top right, #195E9D 0%, transparent 50%), radial-gradient(circle at bottom left, #195E9D 0%, transparent 50%), radial-gradient(circle at bottom right, #42CCA2 0%, transparent 50%), linear-gradient(135deg, #42CCA2 0%, #195E9D 100%)'
      }}
    >
      {/* Background Animation Styles */}
      <style jsx>{`
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .input-glow:focus {
          box-shadow: 0 0 20px rgba(66, 204, 162, 0.4) !important;
          border-color: #42CCA2 !important;
        }
        
        .login-card {
          animation: fadeInScale 0.8s ease-out;
        }
        
        .floating-icon {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .btn-magical {
          background: linear-gradient(45deg, #42CCA2, #195E9D, #42CCA2);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
          border: none;
          position: relative;
          overflow: hidden;
        }
        
        .btn-magical::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }
        
        .btn-magical:hover::before {
          left: 100%;
        }
        
        .form-floating-custom {
          position: relative;
        }
        
        .form-floating-custom .form-control {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          transition: all 0.3s ease;
        }
        
        .form-floating-custom .form-control::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .form-floating-custom .form-control:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #42CCA2;
          color: white;
          transform: translateY(-2px);
        }
        
        .form-floating-custom label {
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }
        
        .form-floating-custom .form-control:focus ~ label,
        .form-floating-custom .form-control:not(:placeholder-shown) ~ label {
          color: #42CCA2;
          transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
        }
        
        .stats-badge {
          animation: slideInUp 0.6s ease-out;
        }
        
        .welcome-text {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }
        
        .login-form {
          animation: slideInUp 1s ease-out 0.4s both;
        }
      `}</style>

      {/* Decorative Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(66, 204, 162, 0.1) 0%, transparent 70%)',
            top: '-150px',
            left: '-150px',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="position-absolute rounded-circle"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(25, 94, 157, 0.1) 0%, transparent 70%)',
            bottom: '-100px',
            right: '-100px',
            animation: 'pulse 3s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            {/* Main Login Card */}
            <div className="card glass-effect border-0 shadow-lg login-card" style={{ borderRadius: '25px' }}>
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4 welcome-text">
                  <div className="floating-icon mb-3">
                    <div 
                      className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(45deg, #42CCA2, #195E9D)',
                        animation: 'glow 2s ease-in-out infinite alternate'
                      }}
                    >
                      <i className="fas fa-home text-white fs-2"></i>
                    </div>
                  </div>
                  <h2 className="text-white fw-bold mb-2">Welcome Back! 👋</h2>
                  <p className="text-white-50 mb-0">
                    Sign in to your Hostel Management account
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger rounded-3 mb-4">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="login-form">
                  <div className="form-floating-custom mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg input-glow"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      required
                      autoComplete="username"
                      style={{ borderRadius: '15px' }}
                    />
                    <label htmlFor="email">
                      <i className="fas fa-envelope me-2"></i>
                      Email Address
                    </label>
                  </div>

                  <div className="form-floating-custom mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg input-glow"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      required
                      autoComplete="current-password"
                      style={{ borderRadius: '15px' }}
                    />
                    <label htmlFor="password">
                      <i className="fas fa-lock me-2"></i>
                      Password
                    </label>
                    <button
                      type="button"
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-white-50 pe-3"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ zIndex: 10 }}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label text-white-50" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-decoration-none" style={{ color: '#42CCA2' }}>
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-magical btn-lg w-100 text-white fw-bold py-3 mb-4"
                    style={{ borderRadius: '15px' }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Login
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;