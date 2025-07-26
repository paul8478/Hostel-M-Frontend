import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css'; // Assuming you have a CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>DASHB⚡ARD</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/students">Students Data</Link></li>
          <li><Link to="/principals">Principal Data</Link></li>
          <li><Link to="/hostels">Hostel Data</Link></li>
          <li><Link to="/colleges">Colleges Data</Link></li>
          <li><Link to="/admin">Admins Data</Link></li>

          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
