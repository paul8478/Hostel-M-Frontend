import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ padding: '20px' }}>
    <h1>Welcome to the Hostel Management System</h1>
    <p>This is a community-driven management system for hostels.</p>
    <Link
      to="/login"
      style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
      }}
    >
      Login
    </Link>
  </div>
);

export default Home;
