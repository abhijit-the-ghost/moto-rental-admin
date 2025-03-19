import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure this is set in your `.env` file

const AuthService = {
  // ✅ ADMIN LOGIN FUNCTION
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      // ✅ Save token in localStorage
      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      return { error: error.response?.data?.message || "Login failed" };
    }
  },

  // ✅ LOGOUT FUNCTION
  logout: () => {
    localStorage.removeItem("adminToken");
  },

  // ✅ CHECK IF ADMIN IS LOGGED IN
  isAuthenticated: () => {
    return !!localStorage.getItem("adminToken");
  },

  // ✅ GET ADMIN TOKEN (For Protected Routes)
  getAuthToken: () => {
    return localStorage.getItem("adminToken");
  },
};

export default AuthService;
