import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import {
  FaTachometerAlt,
  FaMotorcycle,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col w-full">
          {/* Main Content */}
          <div className="flex-1 bg-gray-100">{children}</div>
          {/* Mobile Drawer Toggle */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden fixed top-4 left-4 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
        </div>

        {/* Sidebar Menu */}
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-gray-800 text-white w-64 min-h-full flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-700">
              <a
                href="/"
                className="text-2xl font-extrabold flex items-center gap-2"
              >
                <FaMotorcycle className="text-yellow-400" />
                <span>
                  Moto<span className="text-yellow-400">Rentals</span>
                </span>
              </a>
            </div>

            {/* Navigation */}
            <ul className="menu flex-1 p-4 space-y-2">
              <li>
                <a
                  href="/"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                >
                  <FaTachometerAlt className="text-lg" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/motorcycles"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                >
                  <FaMotorcycle className="text-lg" />
                  Motorcycles
                </a>
              </li>
              <li>
                <a
                  href="/users"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                >
                  <FaUsers className="text-lg" />
                  Users
                </a>
              </li>
              <li>
                <a
                  href="/rents"
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                >
                  <FaClipboardList className="text-lg" />
                  Rents
                </a>
              </li>
            </ul>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full py-3 px-4 rounded-lg text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
