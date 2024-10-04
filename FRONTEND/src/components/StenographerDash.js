import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function StenographerDash() {
  const [isRecording, setIsRecording] = useState(false);
  const [caseID, setCaseID] = useState('');
  const [recordings, setRecordings] = useState([
    { id: 1, name: 'Recording 1', date: '2023-04-18' },
    { id: 2, name: 'Recording 2', date: '2023-04-19' },
    { id: 3, name: 'Recording 3', date: '2023-04-20' },
  ]);

  const handleRecord = () => {
    setIsRecording(true);
    // Start recording logic here
  };

  const handleStop = () => {
    setIsRecording(false);
    // Stop recording logic here
  };

  const handleCaseIDChange = (event) => {
    setCaseID(event.target.value);
  };
  
  const navigate = useNavigate(); // useNavigate for navigation
  
  const handleLogout = () => {
    // Clear any authentication tokens or user data (if stored in local storage/session storage)
    localStorage.removeItem("authToken"); // Example: removing the auth token
    // Redirect to the login page
    navigate("/"); // Redirect to login (assuming you have a login route setup)
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-1/4 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Application Name</h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">OPTIONS</h2>
          <button 
            onClick={handleRecord}
            className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            disabled={isRecording}
          >
            Record
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Recordings</h2>
          <ul>
            {recordings.map((recording) => (
              <li
                key={recording.id}
                className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md"
              >
                {recording.name} - {recording.date}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Case Transcript</h2>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            View Transcript
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Settings</h2>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Open Settings
          </button>
        </div>
        <button 
          onClick={handleLogout} // Attach handleLogout to this button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </aside>
      <main className="w-3/4 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:shadow-outline focus:border-blue-300"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c0 1.1.9 2 2 2s2-.9 2-2 1.1-.9 2-2s-.9-2-2-2zm7.5-7.5V9a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v7.5"
              />
            </svg>
            <span className="text-gray-700 font-medium">Stenographer</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Record</h2>
          <div className="flex items-center">
            <button
              onClick={handleRecord}
              disabled={isRecording}
              className={`bg-${isRecording ? 'red-600' : 'red-500'} hover:bg-${isRecording ? 'red-700' : 'red-600'} text-white font-medium py-2 px-4 rounded-md mr-2 focus:outline-none focus:shadow-outline`}
            >
              <svg
                className="w-4 h-4 mr-2 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.5 5.5a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25h2.25a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25h-2.25z"
                />
              </svg>
              {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
            <button
              onClick={handleStop}
              disabled={!isRecording}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              <svg
                className="w-4 h-4 mr-2 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Stop
            </button>
          </div>
        </div>
        <div className="border rounded-md p-4 bg-white shadow-sm mb-6">
          {/* Display recording/transcript here */}
        </div>
        <div>
          <label htmlFor="caseID" className="block text-gray-700 font-bold mb-2">
            Case ID
          </label>
          <select
            id="caseID"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:shadow-outline focus:border-blue-300"
            value={caseID}
            onChange={handleCaseIDChange}
          >
            <option value="">Select Case ID</option>
            {/* Add more case ID options here */}
            <option value="12345">Case 12345</option>
            {/* ... more case IDs */}
          </select>
        </div>
      </main>
    </div>
  );
}

export default StenographerDash;
