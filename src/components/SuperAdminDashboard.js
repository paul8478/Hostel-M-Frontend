import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CollegeManagement from './CollegeManagement';
import PrincipalManagement from './PrincipalManagement';

function SuperAdminDashboard() {
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
    return <h2>Loading admin data...</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {principal.name}</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: '5px 10px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          🚪 Logout
        </button>
      </div>

      <p><strong>Email:</strong> {principal.email}</p>
      <p><strong>Password:</strong> {principal.password}</p>
      <p><strong>Permission:</strong> {principal.permission}</p>

      <h2>Super Admin Dashboar</h2>

      <section style={{ marginTop: '30px' }}>
        <h3>🧑‍💼 Admin Management</h3>
        <PrincipalManagement />
      </section>

      <section style={{ marginTop: '30px' }}>
        <h3>🏫 College Management</h3>
        <CollegeManagement />
      </section>
    </div>
  );
}

export default SuperAdminDashboard;
