import React, { useState } from 'react';

function CreateAccount() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">Create an account</h2>
        <p className="text-center text-gray-600 mb-8">
          Already have an account?{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </p>

        {/* Step indicators */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <span className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2">1</span>
            <span className="text-sm text-gray-700">Enter your email address</span>
          </div>
          <div className="flex-grow mx-3 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <span className="bg-gray-300 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2">2</span>
            <span className="text-sm text-gray-500">Provide your basic info</span>
          </div>
          <div className="flex-grow mx-3 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <span className="bg-gray-300 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-sm text-gray-500">Create your password</span>
          </div>
        </div>

        {/* Email input */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            What's your email?
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Next button */}
        <button
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
            email ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300'
          }`}
          type="submit"
          disabled={!email}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
