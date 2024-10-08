import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import LoginPage from './components/Login_page'; 
import JudgeDash from './components/Judge_dash'; 
import AdminDashboard from './components/Admin_Dashboard';
import CreateAccount from './components/Signup_page';
import DefaultLandingPage from './components/DefaultLandingPage';
import Users from './components/Users';
import Roles from './components/Roles';
import AddCaseForm from './components/Case_form';
import Collaborators from './components/Collaborators';
import Stenographer from './components/Stenographer';
import CaseRecordings from './components/Case_recordings';

// Import PrivateRoute component
import PrivateRoute from './components/PrivateRoute'; // For protected routes

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/default_landing_page" element={<DefaultLandingPage />} />

        {/* Protected Routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/judge" 
          element={
            <PrivateRoute>
              <JudgeDash />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/roles" 
          element={
            <PrivateRoute>
              <Roles />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/create-case" 
          element={
            <PrivateRoute>
              <AddCaseForm />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/collaborators" 
          element={
            <PrivateRoute>
              <Collaborators />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/stenographer" 
          element={
            <PrivateRoute>
              <Stenographer />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/case-recordings" 
          element={
            <PrivateRoute>
              <CaseRecordings />
            </PrivateRoute>
          } 
        />

        {/* Redirect to login if no match */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
