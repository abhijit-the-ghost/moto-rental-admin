import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import MotorcycleService from "../services/MotorcycleService";

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
  // const token = localStorage.getItem("adminToken");

  // ✅ Fetch motorcycles when page or search changes
  useEffect(() => {
    fetchMotorcycles();
  }, [page, search]);

  const fetchMotorcycles = async () => {
    setLoading(true);
    const data = await MotorcycleService.getAllMotorcycles(
      page,
      MOTORCYCLES_PER_PAGE,
      search
    );
    setMotorcycles(data.motorcycles);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  // ✅ Open modal for adding or editing
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

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMotorcycle((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Image Upload
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // ✅ Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editMotorcycle.name);
    formData.append("company", editMotorcycle.company);
    formData.append("description", editMotorcycle.description);
    formData.append("price", editMotorcycle.price);
    formData.append("status", editMotorcycle.status);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    setLoading(true);
    if (editMotorcycle._id) {
      await MotorcycleService.updateMotorcycle(editMotorcycle._id, formData);
    } else {
      await MotorcycleService.addMotorcycle(formData);
    }
    fetchMotorcycles();
    setIsModalOpen(false);
    setLoading(false);
  };

  // ✅ Handle Delete Motorcycle
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this motorcycle?")) {
      setLoading(true);
      await MotorcycleService.deleteMotorcycle(id);
      fetchMotorcycles();
      setLoading(false);
    }
  };

  // ✅ Handle Pagination Change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 w-full min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Motorcycle Management</h1>
          <button className="btn btn-primary" onClick={() => openModal()}>
            + Add Motorcycle
          </button>
        </div>

        {/* ✅ Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search motorcycles..."
            className="input input-bordered w-full md:w-96"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // ✅ Reset to first page when searching
            }}
          />
        </div>

        {/* ✅ Motorcycle Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Description</th>
                  <th>Price ($)</th>
                  <th>Status</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {motorcycles.length > 0 ? (
                  motorcycles.map((moto, index) => (
                    <tr key={moto._id} className="hover:bg-base-100">
                      <td>{index + 1 + (page - 1) * MOTORCYCLES_PER_PAGE}</td>
                      <td>{moto.name}</td>
                      <td>{moto.company}</td>
                      <td>{moto.description}</td>
                      <td>${moto.price}</td>
                      <td
                        className={
                          moto.status === "Available"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {moto.status}
                      </td>
                      <td>
                        {moto.image && (
                          <img
                            src={`http://localhost:5000${moto.image}`}
                            alt={moto.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary mr-2"
                          onClick={() => openModal(moto)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(moto._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-4 text-gray-500">
                      No motorcycles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* ✅ Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            « Prev
          </button>
          <span className="text-lg font-bold">
            {page} / {totalPages}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next »
          </button>
        </div>

        {/* ✅ Add/Edit Motorcycle Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {editMotorcycle?._id ? "Edit Motorcycle" : "Add New Motorcycle"}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full mb-2"
                  value={editMotorcycle?.name || ""}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="input input-bordered w-full mb-2"
                  value={editMotorcycle?.company || ""}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="textarea textarea-bordered w-full mb-2"
                  value={editMotorcycle?.description || ""}
                  onChange={handleChange}
                  required
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full mb-2"
                  onChange={handleFileChange}
                />
                <button type="submit" className="btn btn-success w-full">
                  {editMotorcycle?._id ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-error w-full mt-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Motorcycle;
