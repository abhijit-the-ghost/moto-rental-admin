import { useState, useEffect } from "react";
import RentalService from "../services/RentalsServices";
import DefaultLayout from "../components/DefaultLayout";
import { FaSearch, FaClipboardList } from "react-icons/fa";

const Rents = () => {
  const [rents, setRents] = useState([]);
  const [filteredRents, setFilteredRents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const RENTS_PER_PAGE = 5;

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await RentalService.getAllRents();
      setRents(data || []);
      setFilteredRents(data || []);
      setTotalPages(Math.ceil((data?.length || 0) / RENTS_PER_PAGE));
    } catch (err) {
      setError("Failed to load rental data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter rents based on search term
  useEffect(() => {
    const filtered = rents.filter((rent) =>
      `${rent.userEmail} ${rent.motorcycleName} ${rent.motorcycleCompany}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredRents(filtered);
    setTotalPages(Math.ceil(filtered.length / RENTS_PER_PAGE));
    setPage(1); // Reset to first page on search
  }, [search, rents]);

  // Paginate filtered rents
  const paginatedRents = filteredRents.slice(
    (page - 1) * RENTS_PER_PAGE,
    page * RENTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  if (loading && !rents.length) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mx-auto"
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
            <p className="mt-4 text-lg text-gray-600">Loading rentals...</p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              className="btn btn-primary shadow-lg hover:shadow-xl transition-all"
              onClick={fetchRents}
            >
              Retry
            </button>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
              <FaClipboardList className="text-blue-600" />
              All Rentals
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Overview of all motorcycle rentals
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md ">
            <input
              type="text"
              placeholder="Search by user, motorcycle, or company..."
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Rentals Table */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {paginatedRents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-4 px-6">#</th>
                      <th className="py-4 px-6">User</th>
                      <th className="py-4 px-6">Motorcycle</th>
                      <th className="py-4 px-6">Company</th>
                      <th className="py-4 px-6">Start Date</th>
                      <th className="py-4 px-6">End Date</th>
                      <th className="py-4 px-6">Status</th>
                      {/* Uncomment if totalCost is available */}
                      <th className="py-4 px-6">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRents.map((rent, index) => (
                      <tr
                        key={rent._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          {(page - 1) * RENTS_PER_PAGE + index + 1}
                        </td>
                        <td className="py-4 px-6">{rent.userEmail}</td>
                        <td className="py-4 px-6">{rent.motorcycleName}</td>
                        <td className="py-4 px-6">{rent.motorcycleCompany}</td>
                        <td className="py-4 px-6">
                          {new Date(rent.rentStartDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          {new Date(rent.rentEndDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`badge ${
                              rent.status === "Rented"
                                ? "badge-error"
                                : "badge-success"
                            }`}
                          >
                            {rent.status}
                          </span>
                        </td>
                        {/* Uncomment if totalCost is available */}
                        <td className="py-4 px-6">
                          ${Number(rent.totalCost).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">
                No rental records match your search.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Rents;
