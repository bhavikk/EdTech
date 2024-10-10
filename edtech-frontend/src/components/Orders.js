// src/components/Orders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/orders/user-orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        setOrders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch orders');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-6 rounded-lg shadow-lg bg-white">
              <h2 className="text-xl font-semibold">Order #{order.orderNumber}</h2>
              <p>Status: {order.status}</p>
              <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <h3 className="font-semibold mt-4">Ordered Products:</h3>
              {order.products.map((product) => (
                <div key={product._id} className="border-b pb-2 mb-2">
                  {product.product ? (
                    <>
                      <p>{product.product.name}</p>
                      <p>Price: ${product.product.price}</p>
                    </>
                  ) : (
                    <p>Product details not available</p>
                  )}
                </div>
              ))}
              <p className="mt-4">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
