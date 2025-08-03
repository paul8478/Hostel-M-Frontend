import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CollegeManagement from './CollegeManagement';
import PrincipalManagement from './PrincipalManagement';

export default function SuperAdminDashboard() {
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
        <h2 className="text-secondary">Loading admin data...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Header */}
      <div
        className="p-4 rounded shadow mb-5 text-white"
        style={{
          background: 'linear-gradient(to right, #43cea2, #185a9d)',
          position: 'relative',
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">👑 Welcome, {principal.name}</h2>
          <button
            onClick={handleLogout}
            className="btn btn-outline-light fw-semibold"
          >
            🚪 Logout
          </button>
        </div>
        <p className="mb-0 small">Logged in as Super Admin</p>
      </div>

      {/* Principal Info Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">📧 Email</h5>
              <p className="card-text text-muted">{principal.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-info shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🔒 Password</h5>
              <p className="card-text text-muted">{principal.password}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">⚙️ Permission</h5>
              <p className="card-text text-muted">{principal.permission}</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Admin Management Section */}
      <section className="mb-5">
        <h3 className="text-success mb-4">🧑‍💼 Admin Management</h3>
        <PrincipalManagement />
      </section>

      {/* College Management Section */}
      <section>
        <h3 className="text-success mb-4">🏫 College Management</h3>
        <CollegeManagement />
      </section>
    </div>
  );
}
