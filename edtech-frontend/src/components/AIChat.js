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

  const handleSendMessage = () => {
    if (!message.trim()) return; // Prevent sending empty messages
  
    // Add user's message to chat history
    const userMessage = { sender: 'user', text: message };
    setChatHistory([...chatHistory, userMessage]);
  
    const messageToSend = { sender: "user", message: message };
  
    // Send message to Rasa
    fetch("http://localhost:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Rasa Response Data:", data); // Log the full response from Rasa
      
        const rasaMessages = data.map((resp) => ({
          sender: "ai",
          text: resp.text || '', // Ensure text is defined
          // Check if the response contains product details in the custom field
          product: resp.custom || null,
        }));
      
        console.log("Processed Rasa Messages:", rasaMessages); // Log the processed messages
      
        // Find the message that contains product details in the custom field
        const recommended = rasaMessages.find(
          (msg) => msg.product // No need to check text here since custom is what you need
        );
      
        console.log("Recommended Product:", recommended); // Log the recommendation
      
        if (recommended && recommended.product) {
          console.log("Setting recommended product...");
      
          // Set full product details
          setRecommendedProduct({
            name: recommended.product.name,
            price: recommended.product.price,
            id: recommended.product.id,
            image: recommended.product.image,
          });
        }
      
        // Update the chat history with the AI's responses
        setChatHistory([...chatHistory, userMessage, ...rasaMessages]);
      })
      
      
      .catch((error) => {
        console.error("Error communicating with Rasa:", error);
      });
  
    // Clear the input field
    setMessage('');
  };
  

  const handleBuyProduct = () => {
    // Add the recommended product to the cart and navigate to checkout
    if (recommendedProduct) {
      setCart([recommendedProduct]);
      navigate('/checkout');
    }
  };

  // Use onKeyDown event to detect the Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submit behavior
      handleSendMessage();
    }
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
              onKeyDown={handleKeyDown}  // Handle Enter key press (comment placed outside JSX)
              placeholder="Type a message..."
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
