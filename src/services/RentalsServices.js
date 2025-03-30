import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken"); // Ensure this is an admin token
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const RentalService = {
  getAllRents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/rentals/all`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all rents:", error);
      throw error;
    }
  },
  returnMotorcycle: async (rentalId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/rentals/return/${rentalId}`,
        {},
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error returning motorcycle:", error);
      return {
        error: error.response?.data?.message || "Failed to return motorcycle",
      };
    }
  },
  // ... other methods
};

export default RentalService;
