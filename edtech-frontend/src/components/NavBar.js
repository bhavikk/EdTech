// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ cartCount }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EdTech Platform</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart ({cartCount})</Link>

          {/* Show Orders and Logout buttons only if the user is authenticated */}
          {isAuthenticated ? (
            <>
              <Link to="/orders" className="hover:underline">Orders</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login'; // Redirect to login after logout
                }}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
