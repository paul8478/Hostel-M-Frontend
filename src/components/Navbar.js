import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#f4f4f4' }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
