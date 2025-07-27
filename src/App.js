// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Admin from './components/Admin';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="student-dashboard" element={<StudentDashboard />} />
        <Route path="admins" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
