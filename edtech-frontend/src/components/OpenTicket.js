import React, { useState } from 'react';
import axios from 'axios';
// import './OpenTicket.css';

const OpenTicket = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [ticketNumber, setTicketNumber] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTicketNumber(null);
        setError('');
        setIsSubmitting(true);

        try {
            // Validate inputs
            if (!description.trim()) {
                throw new Error('Please provide a description.');
            }
            if (!image) {
                throw new Error('Please provide an image.');
            }

            const formData = new FormData();
            formData.append('description', description.trim());
            formData.append('image', image);

            const response = await axios.post('http://localhost:51105/api/tickets', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 10000 // 10 second timeout
            });

            setTicketNumber(response.data.ticketNumber);
            setDescription('');
            setImage(null); // Reset form

            if (e.target) {
                e.target.reset();
            }

        } catch (err) {
            console.error('Error submitting ticket:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('There was an error submitting your ticket. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setError('Please upload only image files');
                return;
            }
            setImage(file);
            setError('');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Open a Ticket</h2>
            {ticketNumber ? (
                <div className="text-center text-green-600">
                    <p>Your ticket has been submitted successfully.</p>
                    <p><strong>Ticket Number:</strong> {ticketNumber}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block font-semibold text-gray-600">Describe the Issue:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter details about the issue..."
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="image" className="block font-semibold text-gray-600">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full py-2"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
                        Submit Ticket
                    </button>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default OpenTicket;