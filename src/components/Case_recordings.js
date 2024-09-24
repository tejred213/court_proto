import React from 'react';

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">Application Name</h1>
        <nav className="space-y-4">
          <div className="text-gray-500">OPTIONS</div>
          <a href="#" className="block text-gray-700">Record</a>
          <a href="#" className="block bg-black text-white p-2 rounded">Recordings</a>
          <a href="#" className="block text-gray-700">Case Transcript</a>
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#" className="block text-gray-700">Settings</a>
          <a href="#" className="block text-gray-700">Logout</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border rounded-full pl-10"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>

          {/* User Info */}
          <div className="flex items-center">
            <i className="fas fa-user-circle text-3xl text-gray-400"></i>
            <span className="ml-2 text-gray-700">Stenographer</span>
          </div>
        </div>

        {/* Recordings Section */}
        <h2 className="text-3xl font-bold mb-4">Recordings</h2>

        {/* Case ID Dropdown */}
        <div className="mb-4">
          <label htmlFor="case-id" className="block text-gray-700 mb-2">Case ID</label>
          <select id="case-id" className="w-1/4 p-2 border rounded">
            <option>ID</option>
          </select>
        </div>

        {/* Recordings Table */}
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">CASE NAME</th>
              <th className="p-4 text-left">AUDIO RECORDING</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">00002</td>
              <td className="p-4">Rosie Pearson</td>
              <td className="p-4"></td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default App;
