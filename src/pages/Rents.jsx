import { useState, useEffect } from "react";
import RentalService from "../services/RentalsServices"; // Adjust path as needed
import DefaultLayout from "../components/DefaultLayout";

const Rents = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all rents on component mount
  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await RentalService.getAllRents(); // Fetch all rents
      setRents(data);
    } catch (err) {
      setError("Failed to load rental data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return <p className="text-center text-gray-500 p-6">Loading...</p>;
  }

  // Error state
  if (error) {
    return (
      <DefaultLayout>
        <div className="p-6">
          <p className="text-red-500 text-center">{error}</p>
          <button
            className="btn btn-primary mt-4 mx-auto block"
            onClick={fetchRents}
          >
            Retry
          </button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="p-6 min-h-screen bg-gray-100 w-full">
        <h2 className="text-2xl font-bold mb-6 text-start">All Rents</h2>

        {rents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-base-200">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Motorcycle</th>
                  <th className="p-3 text-left">Company</th>
                  <th className="p-3 text-left">Start Date</th>
                  <th className="p-3 text-left">End Date</th>
                  <th className="p-3 text-left">Status</th>
                  {/* <th className="p-3 text-left">Total Cost</th> */}
                </tr>
              </thead>
              <tbody>
                {rents.map((rent, index) => (
                  <tr key={rent._id} className="hover:bg-base-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{rent.userEmail}</td>
                    <td className="p-3">{rent.motorcycleName}</td>
                    <td className="p-3">{rent.motorcycleCompany}</td>
                    <td className="p-3">{rent.rentStartDate.split("T")[0]}</td>
                    <td className="p-3">{rent.rentEndDate.split("T")[0]}</td>
                    <td className="p-3">
                      <span
                        className={
                          rent.status === "Rented"
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {rent.status}
                      </span>
                    </td>
                    {/* <td className="p-3">${rent.totalCost}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-start text-gray-500">
            No rental records available.
          </p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Rents;
