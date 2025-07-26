import React, { useEffect, useState } from 'react';
import '../css/sidebar.css';
import '../css/student.css';
const Dashboard = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin);
        if (admin.name) {
          setAdminName(admin.name);
        } else {
          setAdminName('Admin');
        }
      } catch (error) {
        console.error('Error parsing admin data:', error);
        setAdminName('Admin');
      }
    } else {
      setAdminName('Admin');
    }
  }, []);

  return (
    <div className="box">
      <h1>Welcome, {adminName}!</h1>
      <p>This is your admin dashboard.</p>
    </div>
  );
};

export default Dashboard;
