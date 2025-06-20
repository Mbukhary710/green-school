import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import AdminSettings from './pages/AdminSettings';
import ResultUpload from './pages/ResultUpload';
import CheckResult from './pages/CheckResult';

function App() {
  // Simulated user (you can later replace this with actual auth logic)
  const user = {
    name: "Muhammad",
    role: "admin", // Change to 'user' for restricted access
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<Landing user={user} />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/upload-result" element={<ResultUpload />} />

        {/* Student Results Route */}
        <Route path="/check-result" element={<CheckResult />} />

        {/* Other Pages */}
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
