import React from 'react';
import LoginPage from './components/Login_page'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import JudgeDash from './components/Judge_dash'; 
import AdminDashboard from './components/Admin_Dashboard';
import CreateAccount from './components/Signup_page';
import DefaultLandingPage from './components/DefaultLandingPage';
// import Users from './components/Users';
// import Roles from './components/Roles';
// import AddCaseForm from './components/Case_form';
// import Collaborators from './components/Collaborators';
// import Stenographer from './components/Stenographer';
// import CaseRecordings from './components/Case_recordings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set the login page as the default route */}
        <Route path="/" element={<LoginPage />} />  Default landing page
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/default_landing_page" element={<DefaultLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;