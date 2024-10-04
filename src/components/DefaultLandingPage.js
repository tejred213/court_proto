import React from 'react';

function DefaultLandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Waiting for Approval</h2>
        <p className="text-gray-600">
          Your account has been created successfully. Please wait for admin approval before you can log in.
        </p>
      </div>
    </div>
  );
}

export default DefaultLandingPage;
