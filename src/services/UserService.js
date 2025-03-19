import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// ✅ Get Token from Local Storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const UserService = {
  // ✅ Fetch Users
  getUsers: async (page = 1, limit = 5, search = "") => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      return { users: [], totalPages: 1 };
    }
  },

  // ✅ Verify User
  verifyUser: async (userId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/users/verify/${userId}`,
        {},
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error verifying user:",
        error.response?.data || error.message
      );
      return {
        error: error.response?.data?.message || "Failed to verify user",
      };
    }
  },
};

export default UserService;
