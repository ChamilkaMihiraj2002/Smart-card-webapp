import { Button } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
