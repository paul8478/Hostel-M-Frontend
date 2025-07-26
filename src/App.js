import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Sidebar from './components/Sidebar';         

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />

      </Routes>
    </Router>
  );
};

export default App;
