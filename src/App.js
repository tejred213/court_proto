import React from 'react';
import LoginPage from './components/Login_page'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import JudgeDash from './components/Judge_dash'; 
import AdminDashboard from './components/Admin_Dashboard';
// import CreateAccount from './components/Signup_page';
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
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/Admin_dashboard" element={<AdminDashboard/>} />
          {/* Add other routes here */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;