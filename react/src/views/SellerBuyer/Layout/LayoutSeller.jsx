import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../context/ContextProvider.jsx";
import { useState } from "react";

export default function LayoutSeller() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const {
    currentUserID,
    token,
    userType,
    userName,
    setToken,
    setCurrentUserID,
    setUserName,
    setUserType,
  } = useStateContext();

  if (!token) {
    localStorage.clear();
    setToken(null);
    setCurrentUserID(null);
    setUserName(null);
    setUserType(null);
    return <Navigate to="/login" />;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onLogoutConfirm = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      axiosClient.post("/logout").then(() => {
        setToken(null);
        setUserName(null);
        setCurrentUserID(null);
        setUserType(null);
        return <Navigate to="/login" />;
      });
    }
  };

  return (
    <div>
      <div className="dark:bg-gray-900 bg-green-300">
        <div className="container mx-auto relative ">
          <div className="bg-green-300 p-2">
            <div className="container mx-auto flex items-center justify-between">
              {/* Left side of the navigation */}
              <div className="relative group">
                {/* Title */}
                <p
                  className={`text-white text-md ${isDropdownOpen ? "group-hover:text-gray-200" : ""
                    }`}
                >
                  <button
                    onClick={toggleDropdown}
                    className="ml-2 text-white focus:outline-none"
                    title="MENU"
                  >
                    {isDropdownOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="2em"
                        width="2em"
                      >
                        <path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z" />
                      </svg>
                    ) : (
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="2em"
                        width="2em"
                      >
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <path d="M13 7 A4 4 0 0 1 9 11 A4 4 0 0 1 5 7 A4 4 0 0 1 13 7 z" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    )}
                  </button>
                  <span className="text-center items-center">&nbsp;Role</span>
                </p>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute mt-6 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="/buyer-seller/role/buyer"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-200"
                    >
                      Buyer Mode
                    </a>
                    <a
                      href="http://127.0.0.1:3000/buyer-seller/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-200"
                    >
                      Seller Mode
                    </a>
                    {/* Add more dropdown items as needed */}
                  </div>
                )}
              </div>

              {/* Center logo */}
              <div className=" items-center ">
                <p className="text-xl text-white font-bold mt-0 mb-0">
                  {" "}
                  E-Tabo
                  <span className="text-xs text-black">&nbsp;Seller Mode</span>
                </p>
              </div>

              {/* Right side of the navigation */}
              <div className="flex items-center space-x-4">
                {/* Logout button */}
                <a
                  href="/buyer-seller/dashboard "
                  className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                >
                  Dashboard
                </a>
                &nbsp; |
                <a
                  href="/seller/center"
                  className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                >
                  Seller Center
                </a>
                &nbsp; |
                <a
                  href="/seller/center"
                  className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                >
                  Generate Report
                </a>
                &nbsp; | &nbsp;
                <button
                  onClick={onLogoutConfirm}
                  className="text-gray-800 hover:text-white focus:outline-none"
                  title="Logout"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="2em"
                    width="2em"
                  >
                    <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-0">
        <div className="p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
