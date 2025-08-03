import React, { useEffect, useState } from 'react';
import Students from './Student';
import { useNavigate } from 'react-router-dom';

function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem('principalData');
    if (storedData) {
      setPrincipal(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('principalData');
    navigate('/');
  };

  if (!principal) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-secondary">Loading principal data...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div
        className="p-4 rounded shadow mb-5 text-white"
        style={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)',
          position: 'relative',
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">
            🎓 Welcome, {principal.name}
          </h2>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light fw-semibold"
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
        <p className="mb-0 small">Logged in as Principal</p>
      </div>

      {/* Info Cards */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card border-info shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">
                🏫 College ID
              </h5>
              <p className="card-text text-muted">{principal.colgid}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📧 Email</h5>
              <p className="card-text text-muted">{principal.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-warning shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🔒 Password</h5>
              <p className="card-text text-muted">{principal.password}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🔑 Permission</h5>
              <p className="card-text text-muted">{principal.permission}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <hr className="my-5" />

      
    </div>
  );
}

export default PrincipalDashboard;
