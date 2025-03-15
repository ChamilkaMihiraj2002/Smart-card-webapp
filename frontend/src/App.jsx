import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './components/Dashboard/Students/Students.jsx';
import Class from './components/Dashboard/Class/Class.jsx';
import Attendance from './components/Dashboard/Attendence/Attendence.jsx';
import Fees from './components/Dashboard/Fees/Fees.jsx';
import Accounting from './components/Dashboard/Accounting/Accounting.jsx';
import User from './components/Dashboard/User/User.jsx';

function App() {
  return (
    <>
     <Router>
      <Routes>
        {/* Make login the default route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/class" element={<Class />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/user" element={<User />} />
        <Route path="/" element={<Dashboard />} />

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
