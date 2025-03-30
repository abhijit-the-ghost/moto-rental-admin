import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Uses";
import Motorcycle from "./pages/Motorcycle";
import Login from "./pages/Login";
import AdminRoute from "./components/AdminRoute"; // ✅ Import Admin Route
import Rents from "./pages/Rents";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ✅ Protect Admin Routes */}
        <Route
          path="/"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/motorcycles"
          element={
            <AdminRoute>
              <Motorcycle />
            </AdminRoute>
          }
        />
        <Route
          path="/rents"
          element={
            <AdminRoute>
              <Rents />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
