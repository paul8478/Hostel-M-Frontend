import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full h-full m-0 p-0 overflow-hidden">
      <Outlet />
    </div>
  );
};

export default Layout;
