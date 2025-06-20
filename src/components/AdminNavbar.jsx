import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Green School Admin</h1>
      <div className="space-x-4">
        <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/admin/settings" className="hover:underline">Settings</Link>
        <Link to="/admin/results" className="hover:underline">Results</Link>
        <Link to="/admin/upload" className="hover:underline">Upload</Link>
        <button onClick={handleLogout} className="ml-4 text-red-200 hover:text-white">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
