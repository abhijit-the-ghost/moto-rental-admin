import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AdminService from "../services/AdminService";

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
    const data = await AdminService.getDashboardStats();
    setStats(data);
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <div className="p-6 w-full min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ✅ Total Users */}
            <div className="card bg-primary text-primary-content shadow-xl p-6">
              <h2 className="text-lg font-bold">Total Users</h2>
              <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
            </div>

            {/* ✅ Total Motorcycles */}
            <div className="card bg-secondary text-secondary-content shadow-xl p-6">
              <h2 className="text-lg font-bold">Total Motorcycles</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.totalMotorcycles}
              </p>
            </div>

            {/* ✅ Rented Motorcycle Percentage */}
            <div className="card bg-accent text-accent-content shadow-xl p-6">
              <h2 className="text-lg font-bold">Rented Percentage</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.rentedPercentage}%
              </p>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
