// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ cartCount }) {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EdTech Platform</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart ({cartCount})</Link>
          <Link to="/orders" className="hover:underline">Orders</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
