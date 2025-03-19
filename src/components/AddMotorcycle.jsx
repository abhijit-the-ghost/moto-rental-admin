import { useState } from "react";

const AddMotorcycle = () => {
  const [motorcycle, setMotorcycle] = useState({
    name: "",
    brand: "",
    rentPrice: "",
    status: "Available",
  });

  const [isOpen, setIsOpen] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMotorcycle({ ...motorcycle, [name]: value });
  };

  // Handle form submission (Replace with API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Motorcycle Added:", motorcycle);
    alert("Motorcycle added successfully!");
    setIsOpen(false); // Close the modal
    setMotorcycle({ name: "", brand: "", rentPrice: "", status: "Available" }); // Reset form
  };

  return (
    <div className="p-6">
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        + Add Motorcycle
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Motorcycle</h2>

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
                value={motorcycle.name}
                onChange={handleChange}
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
                value={motorcycle.brand}
                onChange={handleChange}
                required
              />

              <label className="label mt-2">
                <span className="label-text">Rent Price ($/day)</span>
              </label>
              <input
                type="number"
                name="rentPrice"
                placeholder="Enter price"
                className="input input-bordered w-full"
                value={motorcycle.rentPrice}
                onChange={handleChange}
                required
              />

              {/* Toggle Status */}
              <label className="label mt-2">
                <span className="label-text">Status</span>
              </label>
              <select
                name="status"
                className="select select-bordered w-full"
                value={motorcycle.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
              </select>

              {/* Submit & Close Buttons */}
              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success w-1/2">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-error w-1/2 ml-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMotorcycle;
