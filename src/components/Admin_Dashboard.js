import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [tempUsers, setTempUsers] = useState([]); // Store users awaiting approval
  const [error, setError] = useState(''); // Error handling
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || { name: 'Admin' }; // Get logged-in user from localStorage
  const navigate = useNavigate();

  // Fetch temporary users (users awaiting approval)
  useEffect(() => {
    const fetchTempUsers = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the token from local storage
        const response = await fetch('http://localhost:5000/api/temp-users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          },
        });

        const data = await response.json();
        
        // Check if the response is an array
        if (Array.isArray(data)) {
          console.log('Fetched temp users:', data); // Log the fetched users
          setTempUsers(data); // Set the data fetched from the API
        } else {
          console.error('Expected an array, but got:', data); // Log unexpected response
          setTempUsers([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error('Error fetching users:', error); // Log the error
        setError('Error fetching users');
      }
    };

    fetchTempUsers();
  }, []);

  // Approve user
  const handleApprove = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/approve-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token in the headers
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (response.ok) {
        setTempUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error approving user:', error); // Log the error
      alert('Error approving user');
    }
  };

  // Reject user
  const handleReject = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/reject-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include the token in the headers
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (response.ok) {
        setTempUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error rejecting user:', error); // Log the error
      alert('Error rejecting user');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the auth token
    localStorage.removeItem('user'); // Clear user info
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-6 flex flex-col justify-between">
        <div>
          {/* Application Name (header that acts as a button to go to admin home) */}
          <h1 
            className="text-2xl font-bold cursor-pointer hover:text-gray-300"
            onClick={() => navigate('/admin')}
          >
            Application Name
          </h1>

          {/* Quick Controls */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Quick Controls</h2>
            <ul className="space-y-2">
              <li className="flex items-center cursor-pointer hover:text-gray-300" onClick={() => navigate('/assign-roles')}>
                <span className="mr-2">+</span> Assign Roles
              </li>
              <li className="flex items-center cursor-pointer hover:text-gray-300" onClick={() => navigate('/create-case')}>
                <span className="mr-2">+</span> Create Case
              </li>
            </ul>
          </div>

          {/* Options */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Options</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/roles')}>Roles</li>
              <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/users')}>Users</li>
              <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/cases')}>Cases</li>
            </ul>
          </div>
        </div>

        {/* Footer Section (Settings and Logout) */}
        <div className="space-y-4">
          <div className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/settings')}>Settings</div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 transition text-white font-medium py-2 px-4 rounded-lg w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header with search bar and logged-in user */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <input
              type="text"
              className="px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Logged in as: {loggedInUser.name}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Pending Approvals</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {Array.isArray(tempUsers) && tempUsers.length > 0 ? (
                tempUsers.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.role}</td>
                    <td className="py-3 px-6 space-x-2 flex">
                      <button 
                        onClick={() => handleApprove(user._id)} 
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(user._id)} 
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3">No temporary users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
