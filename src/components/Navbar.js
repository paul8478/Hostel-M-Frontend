import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userData = JSON.parse(sessionStorage.getItem('principalData'));
  const permission = userData?.permission;

  return (
    <nav style={{ padding: '10px', background: '#f4f4f4' }}>
      {/* <Link to="/" style={{ marginRight: 10 }}>Home</Link> */}
      {/* <Link to="/login" style={{ marginRight: 10 }}>Login</Link> */}

      {permission === 'EDIT' && (
        <>
          <Link to="/principal-dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
          <Link to="/student" style={{ marginRight: 10 }}>Student Data</Link>
          <Link to="/hostel" style={{ marginRight: 10 }}>Hostel Data</Link>
        </>
      )}

      {permission === 'ALL' && (
        <>
          <Link to="/super-admin-dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
          <Link to="/student" style={{ marginRight: 10 }}>Student Data</Link>
          <Link to="/hostel" style={{ marginRight: 10 }}>Hostel Data</Link>
          <Link to="/principalmanage" style={{ marginRight: 10 }}>Principal Data</Link>
          <Link to="/collegemanage" style={{ marginRight: 10 }}>College Data</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
