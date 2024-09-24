import React, { useState } from 'react';

function App() {
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [email, setEmail] = useState('');
  const [collaborators, setCollaborators] = useState([
    { srNo: 1, caseName: 'Caroline Hughes', emailAddress: 'caroline.hughes@gmail.com', date: '14 Feb 2019' },
  ]);

  const handleCaseIdChange = (event) => {
    setSelectedCaseId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddCollaborator = () => {
    const newCollaborator = {
      srNo: collaborators.length + 1,
      caseName: 'Caroline Hughes', // Replace with actual case name
      emailAddress: email,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), // Date of adding
    };

    setCollaborators([...collaborators, newCollaborator]);
    setEmail('');
  };

  const handleRemoveCollaborator = (index) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators.splice(index, 1);
    setCollaborators(updatedCollaborators);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow-md p-6 mr-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Application Name</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded-md text-gray-800">
              Cases
            </a>
          </li>
          <li className="bg-gray-200">
            <a href="#" className="block py-2 px-4 font-bold rounded-md text-gray-800">
              Collaborators
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded-md text-gray-800">
              Case Status
            </a>
          </li>
        </ul>
        <hr className="my-4" />
        <ul className="space-y-2">
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded-md text-gray-800">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded-md text-gray-800">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Collaborators</h2>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Case ID Dropdown */}
          <div className="mb-4">
            <label htmlFor="caseId" className="block mb-2 text-sm font-bold text-gray-800">
              Case ID
            </label>
            <select
              id="caseId"
              value={selectedCaseId}
              onChange={handleCaseIdChange}
              className="block w-full pl-10 text-sm text-gray-700 rounded-md shadow-md focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="">Select Case ID</option>
              {/* Add options dynamically */}
            </select>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full pl-10 text-sm text-gray-700 rounded-md shadow-md focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter email address"
            />
          </div>

          {/* Add Collaborator Button */}
          <button
            className="bg-orange-500 hover:bg-orange-700 text-black font-bold py-4 px-8 text-lg rounded-md shadow-lg transition duration-300"
            onClick={handleAddCollaborator}
          >
            Add Collaborator
          </button>

          {/* Collaborators List */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Collaborators</h2>
            <ul>
              {collaborators.map((collaborator, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">
                    {collaborator.caseName} ({collaborator.emailAddress}) - Added on {collaborator.date}
                  </span>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300"
                    onClick={() => handleRemoveCollaborator(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
