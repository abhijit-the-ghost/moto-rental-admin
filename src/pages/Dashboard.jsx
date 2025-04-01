import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AdminService from "../services/AdminService";
import { FaUsers, FaMotorcycle, FaChartPie } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMotorcycles: 0,
    rentedPercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await AdminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 flex items-center gap-3">
              <FaChartPie className="text-blue-600" />
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Overview of MotoRentals operations
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <svg
                  className="animate-spin h-10 w-10 text-blue-600 mx-auto"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="mt-4 text-lg text-gray-600">Loading stats...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Total Users */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Total Users
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Motorcycles */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaMotorcycle className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Total Motorcycles
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats.totalMotorcycles.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rented Percentage */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FaChartPie className="text-2xl text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Rented Percentage
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats.rentedPercentage}%
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-4">
                  <progress
                    className="progress progress-warning w-full"
                    value={stats.rentedPercentage}
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {!loading && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => (window.location.href = "/users")}
                >
                  Manage Users
                </button>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => (window.location.href = "/motorcycles")}
                >
                  Manage Motorcycles
                </button>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => (window.location.href = "/rents")}
                >
                  View Rentals
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
