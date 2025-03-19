import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const AdminRoute = ({ children }) => {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
};

export default AdminRoute;
