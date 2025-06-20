import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Green School Academy</h1>
      <ul className="flex gap-4">
        <li>
          <a href="#hero" className="hover:underline">Home</a>
        </li>
        <li>
          <a href="#mission" className="hover:underline">Mission</a>
        </li>
        <li>
          <a href="#contact" className="hover:underline">Contact</a>
        </li>
        <li>
          <Link to="/admin-login" className="hover:underline text-yellow-300">
            Admin Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
