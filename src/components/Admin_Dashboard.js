import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminDashboard = () => {
  const [tempUsers, setTempUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Fetch temp users for approval
  useEffect(() => {
    const fetchTempUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/temp-users');
        const data = await response.json();
        setTempUsers(data);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    fetchTempUsers();
  }, []);

  // Approve a user
  const handleApprove = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/approve-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      alert('Error approving user');
    }
  };

  // Reject a user
  const handleReject = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/api/reject-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      alert('Error rejecting user');
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Here, you may want to clear any authentication tokens or user data
    // For example: localStorage.removeItem('userToken');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-6 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={handleLogout} // Call handleLogout on click
          className="mt-auto block w-full bg-red-500 hover:bg-red-600 transition text-white font-medium py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
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
              {tempUsers.map((user) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
