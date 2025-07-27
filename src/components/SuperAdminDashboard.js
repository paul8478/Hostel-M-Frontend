import React from 'react';

import CollegeManagement from './CollegeManagement';
// import StudentManagement from './StudentManagement';
import PrincipalManagement from './PrincipalManagement';  



function SuperAdminDashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Super Admin Dashboard</h2>
      

      <section style={{ marginTop: '30px' }}>
        <h3>🧑‍💼 Admin Management</h3>
        <PrincipalManagement />
      </section>

      <section style={{ marginTop: '30px' }}>
        <h3>🏫 College Management</h3>
        <CollegeManagement />
      </section>




      {/* <section style={{ marginTop: '30px' }}>
        <h3>🎓 Student Management</h3>
        <StudentManagement />
      </section> */}
    </div>
  );
}

export default SuperAdminDashboard;
