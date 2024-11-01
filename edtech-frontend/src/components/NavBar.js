import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ cartCount, isAuthenticated, setIsAuthenticated }) {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EdTech Platform</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">Cart ({cartCount})</Link>

          {isAuthenticated ? (
            <>
              <Link to="/orders" className="hover:underline">Orders</Link>
              <Link to="/customer-service" className="hover:underline">Customer Service</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsAuthenticated(false); // Update the state when logging out
                  window.location.href = '/login';
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
