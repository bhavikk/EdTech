// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">Login to Your Account</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" // text color set to gray-900
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" // text color set to gray-900
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-3 rounded-md hover:bg-blue-600 transition-all"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
