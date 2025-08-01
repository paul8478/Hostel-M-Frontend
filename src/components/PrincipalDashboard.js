import React, { useEffect, useState } from 'react';
import Students from './Student';
import { useNavigate } from 'react-router-dom'; // for redirect

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
    navigate('/'); // Redirect to login/home page (adjust path as needed)
  };

  if (!principal) {
    return <h2>Loading principal data...</h2>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {principal.name}</h2>
        <button onClick={handleLogout} style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
          🚪 Logout
        </button>
      </div>

      <p><strong>College ID:</strong> {principal.colgid}</p>
      <p><strong>Email:</strong> {principal.email}</p>
      <p><strong>Password:</strong> {principal.password}</p>
      <p><strong>Permission:</strong> {principal.permission}</p>

      <section style={{ marginTop: '30px' }}>
        <h3>🧑‍💼 Admin Management</h3>
        <Students />
      </section>
    </div>
  );
}

export default PrincipalDashboard;
