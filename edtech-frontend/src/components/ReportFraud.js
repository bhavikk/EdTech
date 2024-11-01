// ReportFraud.js
import React, { useState } from 'react';
import axios from 'axios';
// import './ReportFraud.css';

const ReportFraud = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [ticketNumber, setTicketNumber] = useState('');
    const [decision, setDecision] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !image) {
            setError('Please provide a description and upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:51105/api/fraudulent-tickets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setTicketNumber(response.data.ticketNumber);
            setDecision(response.data.decision);
            setError('');
            setDescription('');
            setImage(null);
        } catch (err) {
            console.error('Error reporting fraud:', err);
            setError('Failed to report fraud. Please try again later.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Report Fraudulent Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold text-gray-600">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Describe the fraudulent transaction..."
                    ></textarea>
                </div>
                <div>
                    <label className="block font-semibold text-gray-600">Upload OCR Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full py-2"
                    />
                </div>
                <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg">
                    Submit Report
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {ticketNumber && (
                    <div className="text-center text-green-600">
                        <h3>Ticket Submitted Successfully!</h3>
                        <p><strong>Ticket Number:</strong> {ticketNumber}</p>
                        <p><strong>Decision:</strong> {decision}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ReportFraud;