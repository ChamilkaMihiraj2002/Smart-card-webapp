import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./src/Pages/login/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Accounts from "./pages/Accounts";
import Students from "./pages/Students";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/attendance" element={<PrivateRoute element={<Attendance />} />} />
        <Route path="/fees" element={<PrivateRoute element={<Fees />} />} />
        <Route path="/accounts" element={<PrivateRoute element={<Accounts />} />} />
        <Route path="/students" element={<PrivateRoute element={<Students />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
