import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// ✅ Get Token from Local Storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminService = {
  // ✅ Fetch admin statistics
  getDashboardStats: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/stats`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching dashboard stats:",
        error.response?.data || error.message
      );
      return { totalUsers: 0, totalMotorcycles: 0, rentedPercentage: 0 };
    }
  },
};

export default AdminService;
