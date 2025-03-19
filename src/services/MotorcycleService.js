import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// ✅ Get Token from Local Storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
console.log(getAuthHeaders(), "admin token");

const MotorcycleService = {
  // ✅ Fetch All Motorcycles
  getAllMotorcycles: async (page = 1, limit = 5, search = "") => {
    try {
      const response = await axios.get(
        `${BASE_URL}/motorcycles?page=${page}&limit=${limit}&search=${search}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      return { motorcycles: [], totalPages: 1 };
    }
  },

  // ✅ Add a New Motorcycle
  addMotorcycle: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/motorcycles/add`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding motorcycle:", error);
      return {
        error: error.response?.data?.message || "Failed to add motorcycle",
      };
    }
  },

  // ✅ Update a Motorcycle
  updateMotorcycle: async (id, formData) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/motorcycles/update/${id}`,
        formData,
        {
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating motorcycle:", error);
      return {
        error: error.response?.data?.message || "Failed to update motorcycle",
      };
    }
  },

  // ✅ Delete a Motorcycle
  deleteMotorcycle: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/motorcycles/delete/${id}`, {
        headers: getAuthHeaders(),
      });
      return { message: "Motorcycle deleted successfully!" };
    } catch (error) {
      console.error("Error deleting motorcycle:", error);
      return {
        error: error.response?.data?.message || "Failed to delete motorcycle",
      };
    }
  },
};

export default MotorcycleService;
