import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";

const Motorcycle = () => {
  const [search, setSearch] = useState("");
  const [motorcycles, setMotorcycles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMotorcycle, setEditMotorcycle] = useState(null); // Holds data for editing

  // Simulated motorcycle data (Replace this with an API call)
  useEffect(() => {
    setTimeout(() => {
      setMotorcycles([
        { id: 1, name: "Yamaha R15", brand: "Yamaha", status: "Available" },
        { id: 2, name: "Honda CBR 500R", brand: "Honda", status: "Rented" },
        { id: 3, name: "KTM Duke 390", brand: "KTM", status: "Available" },
        { id: 4, name: "Suzuki GSX-R600", brand: "Suzuki", status: "Rented" },
      ]);
    }, 1000);
  }, []);

  // Filter motorcycles based on search
  const filteredMotorcycles = motorcycles.filter(
    (moto) =>
      moto.name.toLowerCase().includes(search.toLowerCase()) ||
      moto.brand.toLowerCase().includes(search.toLowerCase()) ||
      moto.status.toLowerCase().includes(search.toLowerCase())
  );

  // Open the modal for adding or editing
  const openModal = (moto = null) => {
    setEditMotorcycle(moto); // If editing, set the selected motorcycle
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMotorcycle) {
      // Update existing motorcycle
      setMotorcycles(
        motorcycles.map((moto) =>
          moto.id === editMotorcycle.id ? editMotorcycle : moto
        )
      );
    } else {
      // Add new motorcycle
      const newMoto = {
        id: motorcycles.length + 1,
        ...editMotorcycle,
      };
      setMotorcycles([...motorcycles, newMoto]);
    }

    setIsModalOpen(false);
    setEditMotorcycle(null); // Reset form
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

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search motorcycles..."
            className="input input-bordered w-full md:w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Motorcycle Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-base-200">
                <th className="w-20 p-2 border border-gray-300">ID</th>
                <th className="w-48 p-2 border border-gray-300">Name</th>
                <th className="w-64 p-2 border border-gray-300">Brand</th>
                <th className="w-32 p-2 border border-gray-300">Status</th>
                <th className="w-32 p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMotorcycles.length > 0 ? (
                filteredMotorcycles.map((moto) => (
                  <tr key={moto.id} className="hover:bg-base-100">
                    <td className="w-20 p-2 border border-gray-300">
                      {moto.id}
                    </td>
                    <td className="w-48 p-2 border border-gray-300">
                      {moto.name}
                    </td>
                    <td className="w-64 p-2 border border-gray-300">
                      {moto.brand}
                    </td>
                    <td
                      className={`w-32 p-2 border border-gray-300 ${
                        moto.status === "Available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {moto.status}
                    </td>
                    <td className="w-32 p-2 border border-gray-300">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => openModal(moto)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No motorcycles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Motorcycle Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {editMotorcycle ? "Edit Motorcycle" : "Add New Motorcycle"}
              </h2>

              {/* Motorcycle Form */}
              <form onSubmit={handleSubmit}>
                <label className="label">
                  <span className="label-text">Motorcycle Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="input input-bordered w-full"
                  value={editMotorcycle?.name || ""}
                  onChange={(e) =>
                    setEditMotorcycle({
                      ...editMotorcycle,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <label className="label mt-2">
                  <span className="label-text">Brand</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Enter brand"
                  className="input input-bordered w-full"
                  value={editMotorcycle?.brand || ""}
                  onChange={(e) =>
                    setEditMotorcycle({
                      ...editMotorcycle,
                      brand: e.target.value,
                    })
                  }
                  required
                />

                <label className="label mt-2">
                  <span className="label-text">Status</span>
                </label>
                <select
                  name="status"
                  className="select select-bordered w-full"
                  value={editMotorcycle?.status || "Available"}
                  onChange={(e) =>
                    setEditMotorcycle({
                      ...editMotorcycle,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                </select>

                {/* Submit & Close Buttons */}
                <div className="flex justify-between mt-4">
                  <button type="submit" className="btn btn-success w-1/2">
                    {editMotorcycle ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-error w-1/2 ml-2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Motorcycle;
