import React, { useState } from 'react';

const casesData = [
  {
    id: '00001',
    caseName: 'Christine Brooks',
    caseDescription: '089 Kutch Green Apt. 448',
    date: '14 Feb 2019',
    status: 'Completed',
  },
  {
    id: '00002',
    caseName: 'Rosie Pearson',
    caseDescription: '979 Immanuel Ferry Suite 526',
    date: '14 Feb 2019',
    status: 'Processing',
  },
  {
    id: '00003',
    caseName: 'Darrell Caldwell',
    caseDescription: '8587 Frida Ports',
    date: '14 Feb 2019',
    status: 'Rejected',
  },
  {
    id: '00004',
    caseName: 'Gilbert Johnston',
    caseDescription: '768 Destiny Lake Suite 600',
    date: '14 Feb 2019',
    status: 'Completed',
  },
  {
    id: '00005',
    caseName: 'Alan Cain',
    caseDescription: '042 Mylene Throughway',
    date: '14 Feb 2019',
    status: 'Processing',
  },
  {
    id: '00006',
    caseName: 'Alfred Murray',
    caseDescription: '543 Weimann Mountain',
    date: '14 Feb 2019',
    status: 'Completed',
  },
];

const AdminDashboard = () => {
    const [cases, setCases] = useState(casesData);
    const [filterDate, setFilterDate] = useState('14 Feb 2019');
    const [filterName, setFilterName] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
  
    const handleFilterChange = (event) => {
      const { name, value } = event.target;
      if (name === 'filterDate') {
        setFilterDate(value);
      } else if (name === 'filterName') {
        setFilterName(value);
      } else if (name === 'filterStatus') {
        setFilterStatus(value);
      }
    };
  
    const handleResetFilter = () => {
      setFilterDate('14 Feb 2019');
      setFilterName('');
      setFilterStatus('');
    };
  
    const handleAccept = (id) => {
      setCases((prevCases) =>
        prevCases.map((c) =>
          c.id === id ? { ...c, status: 'Completed' } : c
        )
      );
    };
  
    const handleReject = (id) => {
      setCases((prevCases) =>
        prevCases.map((c) =>
          c.id === id ? { ...c, status: 'Rejected' } : c
        )
      );
    };
  
    const filteredCases = cases.filter((c) => {
      return (
        c.date === filterDate &&
        c.caseName.toLowerCase().includes(filterName.toLowerCase()) &&
        (filterStatus === '' || c.status === filterStatus)
      );
    });
  
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 p-6 flex flex-col space-y-6">
          <h1 className="text-2xl font-bold">Application Name</h1>
          {/* Sidebar buttons... */}
          <button className="mt-auto block w-full bg-red-500 hover:bg-red-600 transition text-white font-medium py-2 px-4 rounded-lg">
            Logout
          </button>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cases</h1>
          {/* Filter inputs... */}
  
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Case ID</th>
                  <th className="py-3 px-6 text-left">Case Name</th>
                  <th className="py-3 px-6 text-left">Case Description</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-3 px-6">{c.id}</td>
                    <td className="py-3 px-6">{c.caseName}</td>
                    <td className="py-3 px-6">{c.caseDescription}</td>
                    <td className="py-3 px-6">{c.date}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`py-1 px-3 rounded-full text-sm font-medium ${
                          c.status === 'Completed'
                            ? 'bg-green-200 text-green-800'
                            : c.status === 'Processing'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 space-x-2 flex">
                      <button
                        onClick={() => handleAccept(c.id)}
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(c.id)}
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