import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import MotorcycleService from "../services/MotorcycleService";
import { FaPlus, FaSearch } from "react-icons/fa";

const Motorcycle = () => {
  const [search, setSearch] = useState("");
  const [motorcycles, setMotorcycles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMotorcycle, setEditMotorcycle] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const MOTORCYCLES_PER_PAGE = 5;

  useEffect(() => {
    fetchMotorcycles();
  }, [page, search]);

  const fetchMotorcycles = async () => {
    setLoading(true);
    try {
      const data = await MotorcycleService.getAllMotorcycles(
        page,
        MOTORCYCLES_PER_PAGE,
        search
      );
      setMotorcycles(data.motorcycles || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (moto = null) => {
    setEditMotorcycle(
      moto || {
        name: "",
        company: "",
        description: "",
        price: "",
        status: "Available",
      }
    );
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMotorcycle((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !editMotorcycle.name ||
      !editMotorcycle.company ||
      !editMotorcycle.price
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", editMotorcycle.name);
    formData.append("company", editMotorcycle.company);
    formData.append("description", editMotorcycle.description);
    formData.append("price", editMotorcycle.price);
    formData.append("status", editMotorcycle.status);
    if (imageFile) formData.append("image", imageFile);

    setLoading(true);
    try {
      if (editMotorcycle._id) {
        await MotorcycleService.updateMotorcycle(editMotorcycle._id, formData);
        alert("Motorcycle updated successfully!");
      } else {
        await MotorcycleService.addMotorcycle(formData);
        alert("Motorcycle added successfully!");
      }
      fetchMotorcycles();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting motorcycle:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this motorcycle?"))
      return;
    setLoading(true);
    try {
      await MotorcycleService.deleteMotorcycle(id);
      alert("Motorcycle deleted successfully!");
      fetchMotorcycles();
    } catch (error) {
      console.error("Error deleting motorcycle:", error);
      alert("Failed to delete motorcycle.");
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
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
              Motorcycles
            </h1>
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={() => openModal()}
              disabled={loading}
            >
              <FaPlus /> Add Motorcycle
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md">
            <input
              type="text"
              placeholder="Search motorcycle by name"
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

          {/* Motorcycle Table */}
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
                      <th className="py-4 px-6">Company</th>
                      <th className="py-4 px-6">Description</th>
                      <th className="py-4 px-6">Price ($)</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Image</th>
                      <th className="py-4 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motorcycles.length > 0 ? (
                      motorcycles.map((moto, index) => (
                        <tr
                          key={moto._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            {index + 1 + (page - 1) * MOTORCYCLES_PER_PAGE}
                          </td>
                          <td className="py-4 px-6">{moto.name}</td>
                          <td className="py-4 px-6">{moto.company}</td>
                          <td className="py-4 px-6 max-w-xs truncate">
                            {moto.description}
                          </td>
                          <td className="py-4 px-6">
                            ${Number(moto.price).toLocaleString()}
                          </td>
                          <td
                            className={`py-4 px-6 font-semibold ${
                              moto.status === "Available"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {moto.status}
                          </td>
                          <td className="py-4 px-6">
                            {moto.image && (
                              <img
                                src={
                                  moto.image.startsWith("http")
                                    ? moto.image
                                    : `http://localhost:5000${moto.image}`
                                }
                                alt={moto.name}
                                className="w-16 h-16 object-cover rounded-lg shadow-sm hover:scale-110 transition-transform"
                              />
                            )}
                          </td>
                          <td className="py-4 px-6 flex gap-2">
                            <button
                              className="btn btn-sm btn-outline btn-primary"
                              onClick={() => openModal(moto)}
                              disabled={loading}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline btn-error"
                              onClick={() => handleDelete(moto._id)}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center py-8 text-gray-500"
                        >
                          No motorcycles found
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
              <span className="text-lg font-semibold text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || loading}
              >
                Next »
              </button>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {editMotorcycle?._id
                    ? "Edit Motorcycle"
                    : "Add New Motorcycle"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter motorcycle name"
                      className="input input-bordered w-full"
                      value={editMotorcycle.name || ""}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Company</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Enter company name"
                      className="input input-bordered w-full"
                      value={editMotorcycle.company || ""}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Description</label>
                    <textarea
                      name="description"
                      placeholder="Enter description"
                      className="textarea textarea-bordered w-full"
                      value={editMotorcycle.description || ""}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Price ($/day)</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter rental price"
                      className="input input-bordered w-full"
                      value={editMotorcycle.price || ""}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Status</label>
                    <select
                      name="status"
                      className="select select-bordered w-full"
                      value={editMotorcycle.status || "Available"}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                    </select>
                  </div>
                  <div>
                    <label className="label text-gray-700">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="btn btn-success flex-1"
                      disabled={loading}
                    >
                      {loading
                        ? "Saving..."
                        : editMotorcycle?._id
                        ? "Update"
                        : "Add"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-error flex-1"
                      onClick={() => setIsModalOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Motorcycle;
