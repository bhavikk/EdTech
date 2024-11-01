import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NavBar from './components/NavBar';
import Orders from './components/Orders';
import Login from './components/Login';
import Signup from './components/Signup';
import AIChat from './components/AIChat';
import CustomerService from './components/CustomerService'; // Import Customer Service
import OpenTicket from './components/OpenTicket'; // Import OpenTicket
import StatusTicket from './components/StatusTicket'; // Import StatusTicket
import ReportFraud from './components/ReportFraud'; // Import ReportFraud
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <NavBar cartCount={cart.length} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Customer Service Routes */}
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/customer-service/open-ticket" element={<OpenTicket />} />
        <Route path="/customer-service/status-ticket" element={<StatusTicket />} />
        <Route path="/customer-service/report-fraud" element={<ReportFraud />} />
      </Routes>
      <AIChat cart={cart} setCart={setCart} />
      <ToastContainer />
    </Router>
  );
}

export default App;
