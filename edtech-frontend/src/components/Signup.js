// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    axios
      .post('http://localhost:5000/auth/signup', { username, password })
      .then(() => {
        alert('User created');
        navigate('/login');
      })
      .catch(err => {
        alert('Username already exists');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">Create Your Account</h1>
        <input
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" // text color set to gray-900
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" // text color set to gray-900
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white w-full py-3 rounded-md hover:bg-blue-600 transition-all"
          onClick={handleSignup}
        >
          Signup
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
