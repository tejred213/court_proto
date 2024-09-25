// import React from 'react';
// import LoginPage from './components/Login_page'; 
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import JudgeDash from './components/Judge_dash'; 
// import AdminDash from './components/Admin_Dashboard';
// // import SignupPage from './components/Signup_page';
// // import Users from './components/Users';
// // import Roles from './components/Roles';
// // import AddCaseForm from './components/Case_form';
// // import Collaborators from './components/Collaborators';
// // import Stenographer from './components/Stenographer';
// // import CaseRecordings from './components/Case_recordings';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/AdminDash" element={<AdminDash/>} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login_page';
// import CreateAccount from './components/CreateAccount';
import AdminDashboard from './components/Admin_Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<CreateAccount />} /> */}
        
        {/* Protected Route for Admin Dashboard */}
        <Route
          path="/Admin_Dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;