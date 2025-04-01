import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import UserService from "../services/UserService";
import { FaSearch, FaUser, FaUserCheck } from "react-icons/fa";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const USERS_PER_PAGE = 5;

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getUsers(page, USERS_PER_PAGE, search);
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleVerify = async () => {
    if (!selectedUser?._id) {
      alert("User ID is missing!");
      return;
    }

    setLoading(true);
    try {
      const response = await UserService.verifyUser(selectedUser._id);
      if (response.error) {
        alert(response.error);
      } else {
        alert("User verified successfully!");
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Failed to verify user.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
              <FaUser className="text-blue-600" />
              User Management
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage and verify user accounts
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              disabled={loading}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* User Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <svg
                  className="animate-spin h-10 w-10 text-blue-600"
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
                <span className="ml-4 text-lg text-gray-600">Loading...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-4 px-6">#</th>
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">Role</th>
                      <th className="py-4 px-6">Verified</th>
                      <th className="py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            {index + 1 + (page - 1) * USERS_PER_PAGE}
                          </td>
                          <td className="py-4 px-6">{user.name}</td>
                          <td className="py-4 px-6">{user.email}</td>
                          <td className="py-4 px-6 capitalize">{user.role}</td>
                          <td className="py-4 px-6">
                            <span
                              className={`badge ${
                                user.verified ? "badge-success" : "badge-error"
                              }`}
                            >
                              {user.verified ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              className="btn btn-sm btn-outline btn-primary"
                              onClick={() => openModal(user)}
                              disabled={loading}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-8 text-gray-500"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || loading}
              >
                « Prev
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm ${
                      page === index + 1 ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={loading}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || loading}
              >
                Next »
              </button>
            </div>
          )}

          {/* User Details Modal */}
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {selectedUser.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Role:</span>{" "}
                    {selectedUser.role}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Verified:</span>{" "}
                    <span
                      className={
                        selectedUser.verified
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {selectedUser.verified ? "✅ Yes" : "❌ No"}
                    </span>
                  </p>
                  {selectedUser.phoneNumber && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Phone:</span>{" "}
                      {selectedUser.phoneNumber}
                    </p>
                  )}
                  {selectedUser.dob && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Date of Birth:</span>{" "}
                      {new Date(selectedUser.dob).toLocaleDateString()}
                    </p>
                  )}
                  {(selectedUser.drivingLicense || selectedUser.passport) && (
                    <div className="mt-4">
                      <p className="text-gray-700 font-semibold">Documents:</p>
                      <div className="flex gap-4 mt-2">
                        {selectedUser.drivingLicense && (
                          <img
                            src={selectedUser.drivingLicense}
                            alt="Driving License"
                            className="w-24 h-16 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                          />
                        )}
                        {selectedUser.passport && (
                          <img
                            src={selectedUser.passport}
                            alt="Passport"
                            className="w-24 h-16 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {!selectedUser.verified && (
                  <button
                    className="btn btn-success w-full mt-6 flex items-center gap-2"
                    onClick={handleVerify}
                    disabled={loading}
                  >
                    <FaUserCheck />
                    {loading ? "Verifying..." : "Verify User"}
                  </button>
                )}
                <button
                  className="btn btn-error w-full mt-4"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Users;
