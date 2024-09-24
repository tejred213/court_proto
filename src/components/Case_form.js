import React, { useState } from 'react';

const AddCaseForm = () => {
  const [petitionerFirstName, setPetitionerFirstName] = useState('');
  const [petitionerLastName, setPetitionerLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfFiling, setDateOfFiling] = useState('');
  const [caseType, setCaseType] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [caseDescription, setCaseDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., send data to API
    console.log('Form submitted:', {
      petitionerFirstName,
      petitionerLastName,
      address,
      phoneNumber,
      dateOfFiling,
      caseType,
      caseStatus,
      caseDescription,
    });
  };

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 mb-4 lg:mb-0 lg:mr-8">
        <h2 className="text-lg font-bold mb-4">Application Name</h2>
        <ul className="space-y-2">
          <li>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Assign Roles
            </button>
          </li>
          <li>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Case
            </button>
          </li>
        </ul>
        <hr className="my-4" />
        <ul className="space-y-2">
          <li>Options</li>
          <li>Roles</li>
          <li>Users</li>
          <li>Cases</li>
        </ul>
        <hr className="my-4" />
        <ul className="space-y-2">
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">Add Cases</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="petitionerFirstName" className="block text-gray-700 font-bold mb-2">
                  Petitioner First Name
                </label>
                <input
                  type="text"
                  id="petitionerFirstName"
                  className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Enter your first name"
                  value={petitionerFirstName}
                  onChange={(e) => setPetitionerFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="petitionerLastName" className="block text-gray-700 font-bold mb-2">
                  Petitioner Last Name
                </label>
                <input
                  type="text"
                  id="petitionerLastName"
                  className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Enter your last name"
                  value={petitionerLastName}
                  onChange={(e) => setPetitionerLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dateOfFiling" className="block text-gray-700 font-bold mb-2">
                Date of Filing
              </label>
              <input
                type="date"
                id="dateOfFiling"
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                value={dateOfFiling}
                onChange={(e) => setDateOfFiling(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="caseType" className="block text-gray-700 font-bold mb-2">
                Case Type
              </label>
              <select
                id="caseType"
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              >
                <option value="">Select case type</option>
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
              </select>
            </div>
            <div>
              <label htmlFor="caseStatus" className="block text-gray-700 font-bold mb-2">
                Case Status
              </label>
              <select
                id="caseStatus"
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                value={caseStatus}
                onChange={(e) => setCaseStatus(e.target.value)}
              >
                <option value="">Select case status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="caseDescription" className="block text-gray-700 font-bold mb-2">
                Case Description
              </label>
              <textarea
                id="caseDescription"
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg shadow-md focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter case description"
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              Add Case
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCaseForm;