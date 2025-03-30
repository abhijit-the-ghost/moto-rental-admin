import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import UserService from "../services/UserService";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const USERS_PER_PAGE = 5;

  // ✅ Fetch Users on Load & When Search/Page Changes
  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await UserService.getUsers(page, USERS_PER_PAGE, search);
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  // ✅ Open Modal for User Details
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // ✅ Handle User Verification
  const handleVerify = async () => {
    if (!selectedUser) return;

    console.log("Selected User:", selectedUser); // ✅ Debugging log

    if (!selectedUser._id) {
      alert("User ID is missing!");
      return;
    }

    const response = await UserService.verifyUser(selectedUser._id);
    if (response.error) {
      alert(response.error);
    } else {
      alert("User verified successfully!");
      fetchUsers(); // Refresh user list
      setIsModalOpen(false);
    }
  };

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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // ✅ Reset to first page on search
            }}
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index} className="hover:bg-base-100">
                      <td>{index + 1 + (page - 1) * USERS_PER_PAGE}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => openModal(user)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Pagination Controls */}
        <div className="flex justify-center mt-6">
          <div className="join">
            <button
              className="join-item btn btn-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              «
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  page === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="join-item btn btn-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              »
            </button>
          </div>
        </div>

        {/* ✅ User Modal */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>
              <p>Email: {selectedUser.email}</p>
              <p>Role: {selectedUser.role}</p>
              <p>Verified: {selectedUser.verified ? "✅ Yes" : "❌ No"}</p>
              {!selectedUser.verified && (
                <button
                  className="btn btn-success w-full mt-4"
                  onClick={handleVerify}
                >
                  Verify User
                </button>
              )}
              <button
                className="btn btn-error w-full mt-2"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Users;
