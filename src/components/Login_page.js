import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting Login:', { email, password }); // Log email and password

    try {
      // Call login API
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      // If login is successful
      if (response.status === 200) {
        console.log('Login Successful:', response.data); // Log the successful response
        const { token, user } = response.data; // Access token and user info
        localStorage.setItem('authToken', token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(user)); // Store user details

        // Redirect based on user role
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'judge') {
          navigate('/judge');
        } else if (user.role === 'stenographer') {
          navigate('/stenographer');
        } else if (user.role === 'user') {
          navigate('/users');
        }
      }
    } catch (error) {
      console.error('Login error:', error); // Log error details
      // Check if user exists in TempUser and redirect to default landing page
      if (error.response && error.response.status === 401) {
        await checkTempUser(email);
      } else {
        setError('Invalid email or password');
      }
    }
  };

  // Function to check if the user exists in the TempUser collection
  const checkTempUser = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/api/check-temp-user', { email });
      if (response.status === 200) {
        console.log('User found in TempUser:', response.data); // Log successful check
        // If user is found in TempUser, redirect to default landing page
        navigate('/default_landing_page');
      }
    } catch (error) {
      console.error('Error checking temporary user:', error); // Log error during temp user check
      setError('Error checking temporary user');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">Log in</h2>

        {error && <div className="text-red-500">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => alert('Forgot password functionality not implemented yet')}
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
