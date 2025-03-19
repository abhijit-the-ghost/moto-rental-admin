import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const AuthService = {
  // ✅ Login Function
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (user.role !== "admin") {
        return { error: "Access Denied! Only admins can log in." };
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      return { success: true };
    } catch (error) {
      return {
        error:
          error.response?.data?.message || "Login failed! Please try again.",
      };
    }
  },

  // ✅ Check if User is Authenticated & Admin
  isAuthenticated: () => {
    const token = localStorage.getItem("adminToken");
    const user = JSON.parse(localStorage.getItem("adminUser"));

    return token && user && user.role === "admin";
  },

  // ✅ Logout Function
  logout: () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  },
};

export default AuthService;
