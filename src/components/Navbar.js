import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userData = JSON.parse(sessionStorage.getItem('principalData'));
  const permission = userData?.permission;

  return (
    <nav className="navbar navbar-expand-lg bg-info px-3">
      <div className="container-fluid">
        <div className="navbar-nav">
          {permission === 'EDIT' && (
            <>
              <Link to="/principal-dashboard" className="nav-link text-white me-3">Dashboard</Link>
              <Link to="/student" className="nav-link text-white me-3">Student Data</Link>
              <Link to="/hostel" className="nav-link text-white me-3">Hostel Data</Link>
            </>
          )}

          {permission === 'ALL' && (
            <>
              <Link to="/super-admin-dashboard" className="nav-link text-white me-3">Dashboard</Link>
              <Link to="/student" className="nav-link text-white me-3">Student Data</Link>
              <Link to="/hostel" className="nav-link text-white me-3">Hostel Data</Link>
              <Link to="/principalmanage" className="nav-link text-white me-3">Principal Data</Link>
              <Link to="/collegemanage" className="nav-link text-white me-3">College Data</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
