import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
// import { useNavigate } from "react-router-dom";


const Dashboard = () => {
 
  const [stats, setStats] = useState({
    motorcycles: 0,
    users: 0,
    rentedPercentage: 0,
  });

  useEffect(() => {
    // Simulated API call (Replace with real data later)
    setTimeout(() => {
      setStats({
        motorcycles: 120,
        users: 45,
        rentedPercentage: 60,
      });
    }, 1000);
  }, []);

  
  return (
    <DefaultLayout>
      <>
        <div className="flex min-h-screen min-w-full bg-gray-100">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold">Welcome, Admin</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Motorcycles</div>
                  <div className="stat-value text-primary">
                    {stats.motorcycles}
                  </div>
                </div>
              </div>

              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Users</div>
                  <div className="stat-value text-secondary">{stats.users}</div>
                </div>
              </div>

              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Rented Motorcycles</div>
                  <div className="stat-value text-accent">
                    {stats.rentedPercentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Recent Activities</h3>
              <div className="overflow-x-auto mt-4">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>New User Registered</td>
                      <td>2025-03-18</td>
                      <td className="text-green-500">Completed</td>
                    </tr>
                    <tr>
                      <td>Motorcycle Rented</td>
                      <td>2025-03-17</td>
                      <td className="text-blue-500">Pending</td>
                    </tr>
                    <tr>
                      <td>Payment Received</td>
                      <td>2025-03-16</td>
                      <td className="text-green-500">Completed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default Dashboard;
