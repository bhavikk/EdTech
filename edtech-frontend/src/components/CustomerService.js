// src/components/CustomerService.js
import React from 'react';
import { Link } from 'react-router-dom';

const CustomerService = () => {
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Customer Service</h2>
            <div className="flex flex-col space-y-4">
                <Link to="/customer-service/open-ticket" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-center">
                    Open a Ticket
                </Link>
                <Link to="/customer-service/status-ticket" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center">
                    Status of a Ticket
                </Link>
                <Link to="/customer-service/report-fraud" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-center">
                    Report Fraudulent Transaction
                </Link>
            </div>
        </div>
    );
};

export default CustomerService;
