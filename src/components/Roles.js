import React, { useState } from 'react';

function App() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeSection, setActiveSection] = useState('assign');

  const cases = [
    { id: '00001', name: 'Case 1' },
    { id: '00002', name: 'Case 2' },
  ];

  const users = [
    { id: '1', name: 'John Harris' },
    { id: '2', name: 'Caroline Hughes' },
  ];

  const roles = [
    { id: '1', name: 'Lawyer' },
    { id: '2', name: 'Stenographer' },
  ];

  const handleCaseChange = (event) => {
    setSelectedCase(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAssign = () => {
    // Implement logic to assign role to user in selected case
    console.log('Assign role:', selectedCase, selectedUser, selectedRole);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Application Name</h1>
        <div className="flex items-center">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Admin
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/4 mr-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Quick Controls</h2>
            <button 
              className={`w-full mb-2 py-2 px-4 rounded font-bold transition duration-300 ${activeSection === 'assign' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleSectionChange('assign')}
            >
              Assign Roles
            </button>
            <button 
              className={`w-full mb-2 py-2 px-4 rounded font-bold transition duration-300 ${activeSection === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleSectionChange('create')}
            >
              Create Case
            </button>

            <h2 className="text-xl font-bold mt-6 mb-4 text-gray-700">Options</h2>
            <button 
              className={`w-full mb-2 py-2 px-4 rounded font-bold transition duration-300 ${activeSection === 'roles' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleSectionChange('roles')}
            >
              Roles
            </button>
            <button 
              className={`w-full mb-2 py-2 px-4 rounded font-bold transition duration-300 ${activeSection === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleSectionChange('users')}
            >
              Users
            </button>
            <button 
              className={`w-full mb-2 py-2 px-4 rounded font-bold transition duration-300 ${activeSection === 'cases' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handleSectionChange('cases')}
            >
              Cases
            </button>
          </div>
        </div>

        <div className="w-3/4">
          {activeSection === 'assign' && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Roles</h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                  <label htmlFor="caseId" className="block mb-2 text-gray-700">
                    Case ID
                  </label>
                  <select
                    id="caseId"
                    className="form-select block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCase}
                    onChange={handleCaseChange}
                  >
                    <option value={null}>Select Case</option>
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <label htmlFor="judgeName" className="block mb-2 text-gray-700">
                    Judge
                  </label>
                  <input
                    type="text"
                    id="judgeName"
                    className="form-input block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Judge Name"
                    disabled
                  />
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <label htmlFor="userId" className="block mb-2 text-gray-700">
                    User
                  </label>
                  <select
                    id="userId"
                    className="form-select block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedUser}
                    onChange={handleUserChange}
                  >
                    <option value={null}>Select User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white p-4 rounded shadow">
                  <label htmlFor="roleId" className="block mb-2 text-gray-700">
                    Role
                  </label>
                  <select
                    id="roleId"
                    className="form-select block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedRole}
                    onChange={handleRoleChange}
                  >
                    <option value={null}>Select Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 disabled:opacity-50 transition duration-300"
                onClick={handleAssign}
                disabled={!selectedCase || !selectedUser || !selectedRole}
              >
                Assign
              </button>
            </>
          )}

          {activeSection === 'create' && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Case</h2>
            // Add create case form here
          )}

          {activeSection === 'roles' && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Roles</h2>
            // Add roles management interface here
          )}

          {activeSection === 'users' && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
            // Add users management interface here
          )}

          {activeSection === 'cases' && (
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cases</h2>
            // Add cases management interface here
          )}
        </div>
      </div>
    </div>
  );
}

export default App;