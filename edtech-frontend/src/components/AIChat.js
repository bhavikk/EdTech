// src/components/AIChat.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AIChat({ cart, setCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, { sender: 'user', text: message }]);

      // Call the AI agent API
      fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
        .then((res) => res.json())
        .then((data) => {
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { sender: 'ai', text: `We recommend: ${data.name}` },
          ]);
          setRecommendedProduct(data); // Save recommended product
        })
        .catch((err) => {
          console.error('Error communicating with AI agent:', err);
        });

      setMessage('');
    }
  };

  const handleBuyProduct = () => {
    // Add the recommended product to the cart and navigate to checkout
    setCart([recommendedProduct]);
    navigate('/checkout');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h2 className="text-lg">AI Assistant</h2>
            <button onClick={toggleChat} className="absolute top-3 right-3 text-white">✕</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <p className={`inline-block p-2 rounded-lg ${chat.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
                  {chat.text}
                </p>
              </div>
            ))}

            {/* If a product is recommended, show buttons to buy or decline */}
            {recommendedProduct && (
              <div className="mt-4">
                <button
                  onClick={handleBuyProduct}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Buy {recommendedProduct.name}
                </button>
                <button
                  onClick={() => setRecommendedProduct(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border rounded-lg"
            />
            <button onClick={sendMessage} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button onClick={toggleChat} className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
          💬
        </button>
      )}
    </div>
  );
}

export default AIChat;
