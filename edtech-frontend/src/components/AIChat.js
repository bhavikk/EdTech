// src/components/AIChat.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AIChat({ cart, setCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const navigate = useNavigate();

  // Open chat with greeting and options
  useEffect(() => {
    if (isOpen) {
      setChatHistory([
        { sender: 'ai', text: 'Hello! How can I assist you today?' },
        { sender: 'ai', text: 'Please choose one of the options below:' },
        { sender: 'ai', text: '1. Get Recommendation' },
        { sender: 'ai', text: '2. Open a Ticket' },
        { sender: 'ai', text: '3. Report Fraudulent Transaction' },
      ]);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user's message to chat history
    const userMessage = { sender: 'user', text: message };
    setChatHistory([...chatHistory, userMessage]);

    // Check for specific user options
    if (message === '1' || message.toLowerCase().includes('recommendation')) {
      handleRecommendation();
    } else if (message === '2' || message.toLowerCase().includes('ticket')) {
      navigate('/customer-service/open-ticket');
    } else if (message === '3' || message.toLowerCase().includes('fraud')) {
      navigate('/customer-service/report-fraud');
    } else {
      // If input doesn't match options, send message to AI for a generic response
      sendMessageToAI(message);
    }

    // Clear the input field
    setMessage('');
  };

  const handleRecommendation = () => {
    setChatHistory([...chatHistory, { sender: 'ai', text: 'Getting a recommendation for you...' }]);
  };

  const sendMessageToAI = (message) => {
    fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "user", message }),
    })
      .then((response) => response.json())
      .then((data) => {
        const rasaMessages = data.map((resp) => ({ sender: "ai", text: resp.text || '' }));
        setChatHistory([...chatHistory, ...rasaMessages]);
      })
      .catch((error) => {
        console.error("Error communicating with AI:", error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-96 h-[32rem] bg-white shadow-lg rounded-lg flex flex-col">
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
            {recommendedProduct && (
              <div className="mt-4">
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Buy Now
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
              onKeyDown={handleKeyDown}
              placeholder="Type a message or option..."
              className="w-full p-2 border rounded-lg"
            />
            <button onClick={handleSendMessage} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">
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
