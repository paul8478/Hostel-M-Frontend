import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';  // import Home
import Login from './components/Login';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import PrincipalDashboard from './components/PrincipalDashboard';
import StudentDashboard from './components/StudentDashboard';
import Student from './components/Student';
import Hostel from './components/Hostel';
import PrincipalManagement from './components/PrincipalManagement';
import CollegeManagement from './components/CollegeManagement';
import Admin from './components/Admin';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* Add this index route to show Home at root '/' */}
        <Route index element={<Home />} />

        <Route path="super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="principal-dashboard" element={<PrincipalDashboard />} />
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="student" element={<Student />} />
        <Route path="hostel" element={<Hostel />} />
        <Route path="principalmanage" element={<PrincipalManagement />} />
        <Route path="collegemanage" element={<CollegeManagement />} />
        <Route path="admins" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
