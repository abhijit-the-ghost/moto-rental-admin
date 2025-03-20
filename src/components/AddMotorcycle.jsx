import { useState } from "react";
import MotorcycleService from "../services/MotorcycleService"; // ✅ Import API service

const AddMotorcycle = () => {
  const [motorcycle, setMotorcycle] = useState({
    name: "",
    brand: "",
    description: "",
    rentPrice: "",
    status: "Available",
  });
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMotorcycle({ ...motorcycle, [name]: value });
  };

  // ✅ Handle Image Selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", motorcycle.name);
    formData.append("brand", motorcycle.brand);
    formData.append("description", motorcycle.description);
    formData.append("rentPrice", motorcycle.rentPrice);
    formData.append("status", motorcycle.status);
    formData.append("image", image);

    setLoading(true);
    const response = await MotorcycleService.addMotorcycle(formData);

    if (response.error) {
      alert(response.error);
    } else {
      alert("Motorcycle added successfully!");
      setIsOpen(false);
      setMotorcycle({
        name: "",
        brand: "",
        description: "",
        rentPrice: "",
        status: "Available",
      });
      setImage(null);
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        + Add Motorcycle
      </button>

      {/* ✅ Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Motorcycle</h2>

            {/* ✅ Motorcycle Form */}
            <form onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">Motorcycle Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter name"
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
                className="input input-bordered w-full"
                placeholder="Enter brand"
                value={motorcycle.brand}
                onChange={handleChange}
                required
              />

              <label className="label mt-2">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                placeholder="Enter description"
                value={motorcycle.description}
                onChange={handleChange}
                required
              ></textarea>

              <label className="label mt-2">
                <span className="label-text">Rent Price ($/day)</span>
              </label>
              <input
                type="number"
                name="rentPrice"
                className="input input-bordered w-full"
                placeholder="Enter price"
                value={motorcycle.rentPrice}
                onChange={handleChange}
                required
              />

              {/* ✅ Image Upload */}
              <label className="label mt-2">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleImageChange}
                required
              />

              {/* ✅ Status Selection */}
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

              {/* ✅ Submit & Cancel Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="btn btn-success w-1/2"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-error w-1/2 ml-2"
                  onClick={() => setIsOpen(false)}
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
  );
};

export default AddMotorcycle;
