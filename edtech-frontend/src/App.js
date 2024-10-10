// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NavBar from './components/NavBar';
import Orders from './components/Orders';
import AIChat from './components/AIChat';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <NavBar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <AIChat /> {/* Add the AIChat component here */}
    </Router>
  );
}

export default App;
