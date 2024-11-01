import React, { useState } from 'react';
import axios from 'axios';
// import './StatusTicket.css';

const StatusTicket = () => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [decision, setDecision] = useState('');
    const [error, setError] = useState('');

    const handleCheckStatus = async (e) => {

        e.preventDefault();

        setDecision('');

        setError('');

        if (!ticketNumber.trim()) {

            setError('Please enter a valid ticket number.');

            return;

        }

        try {

            const response = await axios.get(`http://localhost:51105/api/tickets/${ticketNumber.trim()}`);

            setDecision(response.data.decision);

            setError('');

        } catch (err) {

            console.error('Error fetching ticket status:', err);

            if (err.response && err.response.data && err.response.data.message) {

                setError(err.response.data.message);

            } else {

                setError('Ticket not found. Please check the ticket number and try again.');

            }

        }

    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Check Ticket Status</h2>
            <form onSubmit={handleCheckStatus} className="space-y-4">
                <div>
                    <label className="block font-semibold text-gray-600">Ticket Number:</label>
                    <input
                        type="text"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your ticket number"
                    />
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg">
                    Check Status
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {decision && (
                    <div className="text-center text-green-600">
                        <h3>Decision:</h3>
                        <p>{decision}</p>
                    </div>
                )}
            </form>
        </div>
    );
};
export default StatusTicket;