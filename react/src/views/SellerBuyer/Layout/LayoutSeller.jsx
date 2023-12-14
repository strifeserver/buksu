import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client.js";
import { useStateContext } from "../../../context/ContextProvider.jsx";
import { useState } from "react";

export default function LayoutSeller() {
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
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // const [showMenu, setShowMenu] = useState(false);

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

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setToken(null);
      setUserName(null);
      setCurrentUserID(null);
      setUserType(null);
      navigate("/login");
    });
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="dark:bg-gray-900 bg-green-300">
        <div className="container mx-auto relative ">
          <div className="bg-green-300 p-2">
            <div className="container mx-auto flex items-center justify-between">
              {/* Left side of the navigation */}
              <div className="relative group">
              <div
                aria-label="Etabo. Logo"
                role="img"
                className="cursor-pointer"
              >
                <img src="/logo.png" alt="" width="200" height="100" />
              </div>
              
              
              
                {/* Title */}
               
                <p
                  className={`text-white text-md ${
                    isDropdownOpen ? "group-hover:text-gray-200" : ""
                  }`}
                >
                  <button
                    onClick={toggleDropdown}
                    className="ml-2 text-white focus:outline-none"
                    title="Role"
                  >
                    {isDropdownOpen ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="2em"
                        width="2em"
                        stroke="black"
                      >
                        <path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                      viewBox="0 0 24 24" stroke-width="1.5" 
                      stroke="black" 
                      class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg> 
                    
                    )}
                  </button>
                  <span style={{ color: 'black' }}>&nbsp;|&nbsp;</span>

                  <span className="text-l text-black">Seller Centre</span>
                  
                 
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
                    </a>
                  </div>
                )}
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
            

                <span className="text-xl text-center items-center"> {userName}</span>
                <button
                  onClick={onLogoutConfirm}
                  className="text-gray-800 hover:text-white focus:outline-none"
                  title="Logout"
                  
                >
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
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
