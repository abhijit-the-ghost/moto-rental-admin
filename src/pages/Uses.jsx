import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // Simulated user data (Replace this with an API call)
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        {
          id: 3,
          name: "Michael Brown",
          email: "michael@example.com",
          role: "User",
        },
        {
          id: 4,
          name: "Alice Johnson",
          email: "alice@example.com",
          role: "User",
        },
      ]);
    }, 1000);
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DefaultLayout>
      <div className="p-6 w-full min-h-screen">
        <h1 className="text-2xl font-bold">Users</h1>

        {/* Search Bar */}
        <div className="mt-4 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full md:w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-base-200">
                <th className="w-20 p-2 border border-gray-300">ID</th>
                <th className="w-48 p-2 border border-gray-300">Name</th>
                <th className="w-64 p-2 border border-gray-300">Email</th>
                <th className="w-32 p-2 border border-gray-300">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-base-100">
                    <td className="w-20 p-2 border border-gray-300">
                      {user.id}
                    </td>
                    <td className="w-48 p-2 border border-gray-300">
                      {user.name}
                    </td>
                    <td className="w-64 p-2 border border-gray-300">
                      {user.email}
                    </td>
                    <td className="w-32 p-2 border border-gray-300">
                      {user.role}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
