import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useState } from "react";

export default function ASellerBuyerlayout() {
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

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuSm, setShowMenuSm] = useState(false);

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

  const goToCart = (ev) => {
    ev.preventDefault();
    window.location.href = "/buyer/cart";
  };

  return (
    <>

 <div className="dark:bg-gray-900 bg-green-200">
        
        <div className="2xl:container 2xl:mx-auto md:py-5 lg:px-20 md:px-6 p-4">
          <div className="flex items-center justify-between">
            <div className="lg:w-3/12">
              
              <div className="w-7/12 hidden lg:flex items-center space-x-3 border-b border-gray-200 pb-2">
          
          
           
              <div
                aria-label="Etabo. Logo"
                role="img"
                className="cursor-pointer"
              >
                <img src="/logo.png" alt="" width="500" height="400" />
              </div>
              
               
              </div>
              <button
                onClick={() => setShowMenu(true)}
                aria-label="Open Menu"
                className="text-gray-800 dark:text-white hidden md:block lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-800 rounded"
              >
                <svg
                  className="fill-stroke"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 18L4 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 6L4 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => setSearch(true)}
                aria-label="Search Menu"
                className="text-gray-800 dark:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5"
              >
                <svg
                  className="fill-stroke"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.9984 19.0004L14.6484 14.6504"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="lg:w-6/12 flex flex-col justify-center items-center space-y-3.5">
             
              <div className="hidden lg:block">
                <ul className="flex items-center space-x-10">
                  <li>
                    <a
                      href="/buyer/home"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 hover:text-white"
                    >
                      Home
                    </a>
                  </li>

                  <li>
                    <a
                      href="/buyer/order/products"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 hover:text-white"
                    >
                      Products
                    </a>
                  </li>

                  <li>
                    <a
                      href="/buyer/orders"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-gray-800 hover:text-white"
                    >
                      Orders
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:w-3/12 flex justify-end items-center space-x-4">
              <a href="" onClick={onLogout}>

              <svg title="logout" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>

              </a>
              <div>
                  
                  <img src="/farmer.png" alt="" width={50} height={20} />
                  </div>
               <p className="bg-transparent text-md text-gray-600 focus:outline-none" >
                    {" "}
                    {userName}
                  </p>
          
          
          
              <button
                onClick={() => setShowMenuSm(true)}
                aria-label="open menu"
                className="text-gray-800 dark:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5"
              >
                <svg
                  className="fill-stroke"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 18H20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
       
          {/* <div id="md-menu" className={`${showMenu ? "md:block" : ""} hidden lg:hidden absolute z-10 inset-0 h-screen w-full dark:bg-gray-800 bg-gray-800 bg-opacity-70 dark:bg-opacity-70`}>
                    <div className="relative w-full h-screen">
                        <div className="absolute inset-0 w-1/2 bg-white dark:bg-gray-900 p-6 justify-center">
                            <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-3 mx-2">
                                    <div>
                                        <svg className="fill-stroke text-gray-800 dark:text-white" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.9984 19.0004L14.6484 14.6504" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input type="text" placeholder="Search for products" className="text-sm text-gray-600 dark:text-gray-300 focus:outline-none bg-transparent" />
                                </div>
                                <button onClick={() => setShowMenu(false)} aria-label="close menu" className="focus:outline-none focus:ring-2 focus:ring-gray-800">
                                    <svg className="fill-stroke text-gray-800 dark:text-white" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-8">
                                <ul className="flex flex-col space-y-8">
                                    <li className="flex items-center justify-between">
                                        <a href="javascript:void(0)" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            Home
                                        </a>
                                        <button className="fill-stroke text-black dark:text-white" aria-label="show options">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <a href="javascript:void(0)" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            Catalog
                                        </a>
                                        <button className="fill-stroke text-black dark:text-white" aria-label="show options">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <a href="javascript:void(0)" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            Pages
                                        </a>
                                        <button className="fill-stroke text-black dark:text-white" aria-label="show options">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <a href="javascript:void(0)" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            Blog
                                        </a>
                                        <button className="fill-stroke text-black dark:text-white" aria-label="show options">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <a href="javascript:void(0)" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            Contact us
                                        </a>
                                        <button className="fill-stroke text-black dark:text-white" aria-label="show options">
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 6L8 10L4 6" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
          {/* Search menu */}
          {/* <div id="mobile-search-menu" className={`${search ? "flex" : "hidden"} md:hidden absolute inset-0 z-10 flex-col w-full h-screen bg-white dark:bg-gray-900 pt-4`}>
                    <div className="w-full">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mx-4">
                            <div className="flex items-center space-x-3 mx-2">
                                <div>
                                    <svg className="fill-stroke text-gray-800 dark:text-white" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.9984 19.0004L14.6484 14.6504" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Search for products" className="text-sm text-gray-600 focus:outline-none bg-transparent" />
                            </div>
                            <button aria-label="close menu" onClick={() => setSearch(false)} className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                <svg className="fill-stroke" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5L5 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 5L15 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 mx-4">
                        <h2 className="text-sm text-gray-600 dark:text-gray-300 uppercase">Suggestions</h2>
                        <ul className="mt-6 flex flex-col space-y-6">
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Bags
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Shoes
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Capes
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Coats
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Denim 2021
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Leather shoe collection 2021
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Active wear
                                </a>
                            </li>
                            <li className="flex items-center justify-between">
                                <a href="javascript:void(0)" className="text-sm text-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                    Sweat suits
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full h-full flex items-end">
                        <ul className="bg-gray-50 dark:bg-gray-800 py-10 px-4 flex flex-col space-y-8 w-full">
                            <li>
                                <a className="flex items-center space-x-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline" href="javascript:void(0)">
                                    <div>
                                        <svg className="fill-stroke" width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M1 5H21" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="text-base">Cart</p>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center space-x-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline" href="javascript:void(0)">
                                    <div>
                                        <svg className="fill-stroke" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-base">Wishlist</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> */}
          {/* Main Menu */}
          <div
            id="mobile-menu"
            className={`${showMenuSm ? "flex" : "hidden"
              } md:hidden absolute inset-0 z-10 flex-col w-full h-screen bg-white pt-4`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mx-4">
                <div />
                <div>
                  <p className="text-base font-semibold text-gray-800">Menu</p>
                </div>
                <button
                  aria-label="close menu"
                  onClick={() => setShowMenuSm(false)}
                  className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                >
                  <svg
                    className="fill-stroke"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5L5 15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 5L15 15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6 mx-4">
              <ul className="flex flex-col space-y-8">
                <li className="flex items-center justify-between">
                  <a
                    href="javascript:void(0)"
                    className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    Home
                  </a>
                  <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6L8 10L4 6"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <a
                    href="javascript:void(0)"
                    className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    Catalog
                  </a>
                  <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6L8 10L4 6"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <a
                    href="javascript:void(0)"
                    className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    Pages
                  </a>
                  <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6L8 10L4 6"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <a
                    href="javascript:void(0)"
                    className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    Blog
                  </a>
                  <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6L8 10L4 6"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <a
                    href="javascript:void(0)"
                    className="text-base text-gray-800 focus:outline-none dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                  >
                    Contact us
                  </a>
                  <button className="focus:outline-none focus:ring-2 text-black dark:text-white focus:ring-gray-800 rounded hover:bg-gray-100 p-0.5">
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6L8 10L4 6"
                        stroke="currentColor"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-full h-full flex items-end">
              <ul className="bg-gray-50 dark:bg-gray-800 py-10 px-4 flex flex-col space-y-8 w-full">
                <li>
                  <a
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    href="javascript:void(0)"
                  >
                    <div>
                      <svg
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z"
                          stroke="#1F2937"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 5H21"
                          stroke="#1F2937"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9"
                          stroke="#1F2937"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-base text-gray-800">Cart</p>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline"
                    href="javascript:void(0)"
                  >
                    <div>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-base text-gray-800">Wishlist</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="p-0">
        <div className="p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
      {/* <hr className="" /> */}
      <div className="bg-green-200">
        <div className="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4">
            <div className="flex flex-col flex-shrink-0">
              <div>
                {/* <svg width="57" height="17" viewBox="0 0 57 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.36 12.328H12.896V16H0.464V0.159999H5.36V12.328ZM18.8135 16.24C17.5815 16.24 16.6055 15.92 15.8855 15.28C15.1655 14.624 14.8055 13.552 14.8055 12.064V4H19.6535V10.936C19.6535 11.544 19.7655 11.976 19.9895 12.232C20.2135 12.488 20.5415 12.616 20.9735 12.616C21.4375 12.616 21.8055 12.44 22.0775 12.088C22.3655 11.736 22.5095 11.168 22.5095 10.384V4H27.3575V16H23.0135L22.8935 13.6C22.1735 15.36 20.8135 16.24 18.8135 16.24ZM34.3209 4L36.1209 7.672L37.9689 4H43.3689L39.2649 9.976L43.4649 16H37.9449L36.0249 12.136L34.1289 16H28.6809L32.9289 9.904L28.8249 4H34.3209ZM50.2822 16.24C48.2022 16.24 46.5702 15.696 45.3862 14.608C44.2022 13.52 43.6102 11.984 43.6102 10C43.6102 8.672 43.8822 7.544 44.4262 6.616C44.9702 5.688 45.7302 4.984 46.7062 4.504C47.6822 4.008 48.8102 3.76 50.0902 3.76C51.4022 3.76 52.5142 4.008 53.4262 4.504C54.3542 4.984 55.0582 5.656 55.5382 6.52C56.0342 7.384 56.2822 8.392 56.2822 9.544C56.2822 10.136 56.2422 10.64 56.1622 11.056H48.2662C48.3782 11.776 48.6022 12.272 48.9382 12.544C49.2902 12.8 49.7542 12.928 50.3302 12.928C50.8262 12.928 51.2182 12.824 51.5062 12.616C51.8102 12.408 52.0262 12.12 52.1542 11.752L56.0422 12.904C55.8342 13.64 55.4422 14.256 54.8662 14.752C54.2902 15.248 53.6022 15.624 52.8022 15.88C52.0022 16.12 51.1622 16.24 50.2822 16.24ZM50.0902 7.048C49.5782 7.048 49.1702 7.192 48.8662 7.48C48.5782 7.768 48.3862 8.256 48.2902 8.944H51.6982C51.6342 8.32 51.4742 7.848 51.2182 7.528C50.9782 7.208 50.6022 7.048 50.0902 7.048Z"
                                fill="#1F2937"
                            />
                        </svg> */}

                <h1 className="text-bold">ETabo</h1>
              </div>
              <p className="text-sm leading-none text-gray-800 mt-4">
                Copyright © 2023 E-Tabo
              </p>
              <p className="text-sm leading-none text-gray-800 mt-4">
                All rights reserved
              </p>
              <div className="flex items-center gap-x-4 mt-12">
                <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.00081 0.233398C6.68327 0.233398 6.39243 0.243215 5.48219 0.283343C4.57374 0.323644 3.95364 0.462973 3.41106 0.667403C2.84981 0.87855 2.37372 1.161 1.8994 1.62066C1.42473 2.08016 1.13317 2.54137 0.914502 3.08491C0.702944 3.61071 0.558942 4.2116 0.518053 5.09132C0.477342 5.97311 0.466675 6.25504 0.466675 8.50015C0.466675 10.7453 0.476986 11.0262 0.518231 11.9079C0.560009 12.788 0.703833 13.3887 0.914679 13.9144C1.13282 14.4581 1.42437 14.9193 1.89887 15.3788C2.37301 15.8386 2.8491 16.1218 3.40999 16.3329C3.95293 16.5373 4.57321 16.6767 5.48148 16.717C6.39171 16.7571 6.68238 16.7669 8.99974 16.7669C11.3175 16.7669 11.6074 16.7571 12.5176 16.717C13.4261 16.6767 14.0469 16.5373 14.5898 16.3329C15.1509 16.1218 15.6263 15.8386 16.1004 15.3788C16.5751 14.9193 16.8667 14.4581 17.0853 13.9145C17.2951 13.3887 17.4391 12.7878 17.4818 11.9081C17.5227 11.0263 17.5333 10.7453 17.5333 8.50015C17.5333 6.25504 17.5227 5.97328 17.4818 5.09149C17.4391 4.21143 17.2951 3.61071 17.0853 3.08508C16.8667 2.54137 16.5751 2.08016 16.1004 1.62066C15.6258 1.16082 15.1511 0.878377 14.5893 0.667403C14.0453 0.462973 13.4249 0.323644 12.5164 0.283343C11.6062 0.243215 11.3164 0.233398 8.99814 0.233398H9.00081ZM8.23525 1.72311C8.46245 1.72277 8.71597 1.72311 9.00077 1.72311C11.2792 1.72311 11.5492 1.73104 12.449 1.77065C13.281 1.8075 13.7326 1.94218 14.0334 2.05533C14.4316 2.20517 14.7155 2.38428 15.014 2.67362C15.3127 2.96295 15.4976 3.23851 15.6526 3.62429C15.7694 3.91535 15.9086 4.3528 15.9464 5.15881C15.9873 6.03026 15.9962 6.29204 15.9962 8.49823C15.9962 10.7044 15.9873 10.9662 15.9464 11.8377C15.9084 12.6437 15.7694 13.0811 15.6526 13.3722C15.4979 13.758 15.3127 14.0327 15.014 14.3218C14.7153 14.6112 14.4318 14.7903 14.0334 14.9401C13.7329 15.0538 13.281 15.1881 12.449 15.225C11.5494 15.2646 11.2792 15.2732 9.00077 15.2732C6.72217 15.2732 6.45212 15.2646 5.55256 15.225C4.72055 15.1878 4.26899 15.0531 3.96801 14.9399C3.56978 14.7901 3.28533 14.611 2.98666 14.3216C2.68799 14.0323 2.5031 13.7574 2.34808 13.3715C2.23128 13.0804 2.09208 12.643 2.05421 11.837C2.01332 10.9655 2.00514 10.7037 2.00514 8.49617C2.00514 6.2886 2.01332 6.0282 2.05421 5.15674C2.09226 4.35073 2.23128 3.91329 2.34808 3.62188C2.50275 3.2361 2.68799 2.96054 2.98666 2.67121C3.28533 2.38187 3.56978 2.20276 3.96801 2.05258C4.26881 1.93891 4.72055 1.80457 5.55256 1.76755C6.33977 1.7331 6.64484 1.72277 8.23525 1.72105V1.72311ZM13.5558 3.09574C12.9905 3.09574 12.5318 3.53956 12.5318 4.08741C12.5318 4.63508 12.9905 5.07942 13.5558 5.07942C14.1212 5.07942 14.5799 4.63508 14.5799 4.08741C14.5799 3.53974 14.1212 3.09574 13.5558 3.09574ZM9.00082 4.25481C6.58071 4.25481 4.61855 6.15564 4.61855 8.50013C4.61855 10.8446 6.58071 12.7446 9.00082 12.7446C11.4209 12.7446 13.3824 10.8446 13.3824 8.50013C13.3824 6.15564 11.4209 4.25481 9.00082 4.25481ZM9.00079 5.74454C10.5717 5.74454 11.8453 6.97818 11.8453 8.50013C11.8453 10.0219 10.5717 11.2557 9.00079 11.2557C7.42975 11.2557 6.15632 10.0219 6.15632 8.50013C6.15632 6.97818 7.42975 5.74454 9.00079 5.74454Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.5333 8.4886C17.5333 9.04766 17.4746 9.60594 17.3592 10.1501C17.2467 10.6814 17.08 11.203 16.8617 11.7016C16.6483 12.1914 16.3837 12.6634 16.0745 13.1035C15.77 13.5409 15.4191 13.9512 15.0337 14.3253C14.6474 14.6977 14.2224 15.0367 13.7711 15.333C13.3152 15.6304 12.8273 15.8864 12.3215 16.094C11.806 16.3044 11.2664 16.4657 10.7184 16.5745C10.1559 16.6866 9.57755 16.7438 8.99962 16.7438C8.42126 16.7438 7.8429 16.6866 7.28121 16.5745C6.73244 16.4657 6.19283 16.3044 5.67779 16.094C5.17195 15.8864 4.68357 15.6304 4.22772 15.333C3.77645 15.0367 3.35143 14.6977 2.96599 14.3253C2.58015 13.9512 2.22928 13.5409 1.92427 13.1035C1.61675 12.6634 1.35172 12.1913 1.13755 11.7016C0.919183 11.203 0.752114 10.6814 0.639188 10.1501C0.525025 9.60594 0.466675 9.04766 0.466675 8.4886C0.466675 7.92913 0.524992 7.36965 0.639221 6.82665C0.752147 6.29538 0.919216 5.77299 1.13759 5.27519C1.35175 4.78505 1.61678 4.31265 1.9243 3.87246C2.22931 3.43473 2.58018 3.02517 2.96602 2.65069C3.35146 2.27823 3.77648 1.94007 4.22775 1.64421C4.6836 1.3455 5.17198 1.08958 5.67783 0.881567C6.19286 0.670713 6.73244 0.509099 7.28124 0.401087C7.84294 0.289844 8.4213 0.233398 8.99966 0.233398C9.57758 0.233398 10.1559 0.289844 10.7185 0.401087C11.2664 0.509131 11.806 0.670745 12.3215 0.881567C12.8273 1.08955 13.3153 1.3455 13.7711 1.64421C14.2224 1.94007 14.6475 2.27823 15.0337 2.65069C15.4191 3.02517 15.77 3.43473 16.0746 3.87246C16.3837 4.31265 16.6483 4.78508 16.8617 5.27519C17.08 5.77299 17.2467 6.29538 17.3592 6.82665C17.4746 7.36965 17.5333 7.92913 17.5333 8.4886ZM5.89026 2.11217C3.85805 3.0405 2.34131 4.85195 1.86836 7.03507C2.06048 7.03668 5.0973 7.07377 8.59622 6.17446C7.33492 4.00666 5.98735 2.23757 5.89026 2.11217ZM9.2 7.26001C5.44774 8.34669 1.84711 8.2685 1.71795 8.26369C1.71585 8.33945 1.71211 8.4128 1.71211 8.4886C1.71211 10.2996 2.41839 11.9507 3.57929 13.1991C3.57678 13.1954 5.57108 9.77282 9.50377 8.54262C9.59876 8.51199 9.69546 8.48456 9.79128 8.45797C9.60838 8.05732 9.40875 7.65584 9.2 7.26001ZM13.8124 3.1977C12.5293 2.10329 10.8447 1.43946 8.9996 1.43946C8.40748 1.43946 7.83286 1.50879 7.28242 1.63697C7.39157 1.77887 8.76042 3.53549 10.0067 5.74921C12.7565 4.75199 13.7944 3.22348 13.8124 3.1977ZM10.288 9.6261C10.2718 9.63131 10.2556 9.6358 10.2397 9.64142C5.93997 11.0914 4.53583 14.0136 4.52064 14.0455C5.75781 14.9762 7.30956 15.5377 8.99965 15.5377C10.0088 15.5377 10.9701 15.339 11.8448 14.9791C11.7368 14.3632 11.3135 12.2042 10.288 9.6261ZM13.0719 14.3349C14.7082 13.2668 15.8703 11.5706 16.1945 9.60591C16.0445 9.55916 14.0057 8.93477 11.6535 9.29958C12.6093 11.8407 12.9977 13.9101 13.0719 14.3349ZM10.5676 6.79966C10.7368 7.13585 10.9006 7.47801 11.0518 7.82188C11.1056 7.94524 11.1581 8.06618 11.2093 8.18708C13.7128 7.88233 16.1792 8.39506 16.2846 8.41599C16.2679 6.74483 15.65 5.21108 14.6275 4.01032C14.6137 4.02922 13.4449 5.66294 10.5676 6.79966Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    width="16"
                    height="13"
                    viewBox="0 0 16 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5208 3.59864L7.55438 4.13498L6.99479 4.0693C4.95791 3.81755 3.17843 2.9638 1.66756 1.52992L0.928908 0.818458L0.73865 1.34385C0.33575 2.51503 0.593158 3.75188 1.43253 4.58375C1.8802 5.04346 1.77948 5.10914 1.00725 4.8355C0.73865 4.74793 0.503625 4.68226 0.481242 4.71509C0.4029 4.79171 0.6715 5.78776 0.884142 6.18181C1.17513 6.72909 1.76828 7.26542 2.4174 7.58284L2.96579 7.83459L2.31668 7.84554C1.68994 7.84554 1.66756 7.85648 1.73471 8.08634C1.95854 8.79781 2.84268 9.55305 3.82755 9.88142L4.52143 10.1113L3.91708 10.4615C3.02175 10.965 1.96973 11.2496 0.917717 11.2715C0.414092 11.2825 0 11.3262 0 11.3591C0 11.4685 1.36538 12.0815 2.15999 12.3223C4.54382 13.0338 7.37531 12.7273 9.50173 11.5123C11.0126 10.6476 12.5235 8.92915 13.2286 7.26542C13.6091 6.37883 13.9896 4.75888 13.9896 3.98174C13.9896 3.47824 14.0232 3.41257 14.6499 2.81056C15.0192 2.4603 15.3662 2.0772 15.4333 1.96775C15.5452 1.75978 15.534 1.75978 14.9633 1.94586C14.012 2.27422 13.8777 2.23044 14.3477 1.73789C14.6947 1.38763 15.1088 0.752784 15.1088 0.566709C15.1088 0.533872 14.9409 0.5886 14.7506 0.68711C14.5492 0.796566 14.1015 0.96075 13.7658 1.05926L13.1614 1.24534L12.613 0.884131C12.3108 0.68711 11.8856 0.468198 11.6617 0.402524C11.0909 0.249286 10.218 0.271177 9.70318 0.446307C8.30422 0.938859 7.42008 2.20855 7.5208 3.59864Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.6677 1.17143C16.4021 1.36664 16.9804 1.94183 17.1767 2.67227C17.5333 3.99611 17.5333 6.75832 17.5333 6.75832C17.5333 6.75832 17.5333 9.52043 17.1767 10.8444C16.9804 11.5748 16.4021 12.15 15.6677 12.3453C14.3369 12.7 9.00001 12.7 9.00001 12.7C9.00001 12.7 3.66309 12.7 2.33218 12.3453C1.59783 12.15 1.0195 11.5748 0.823232 10.8444C0.466675 9.52043 0.466675 6.75832 0.466675 6.75832C0.466675 6.75832 0.466675 3.99611 0.823232 2.67227C1.0195 1.94183 1.59783 1.36664 2.33218 1.17143C3.66309 0.81665 9.00001 0.81665 9.00001 0.81665C9.00001 0.81665 14.3369 0.81665 15.6677 1.17143ZM7.40002 4.43326V9.59993L11.6667 7.01669L7.40002 4.43326Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="sm:ml-0 ml-8">
              <h2 className="text-base font-semibold leading-4 text-gray-800">
                Institutional Sponsors
              </h2>
              <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">
                LGU Lantapan
              </p>
              <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">
                Department of Agriculture
              </p>
              <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">
                Department of Trade and Industry
              </p>
              {/* <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">Contact us</p>
                    <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">Testimonials</p> */}
            </div>
            <div>
              <h2 className="text-base font-semibold leading-4 text-gray-800">
                Support
              </h2>
              <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">
                Legal policy
              </p>
              <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">
                Status policy
              </p>
              <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">
                Privacy policy
              </p>
              {/* <p className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer">Terms of service</p> */}
            </div>
            <div className="mt-10 lg:block hidden">
              <label className="text-xl font-medium leading-5 text-gray-800">
                Get updates via
              </label>
              <div className="cursor-pointer flex items-center justify-between border border-gray-800 mt-4">
                <input
                  type="text"
                  className="text-base leading-4 p-4 w-full focus:outline-none text-gray-800 placeholder-gray-800"
                  placeholder="lgulantapanda@gmail.com"
                />
                <svg
                  className="mr-4 fill-current text-gray-800 hover:text-gray-500"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:hidden">
            <label className="text-xl font-medium leading-5 text-gray-800">
              Get updates
            </label>
            <div className="flex items-center justify-between border border-gray-800 mt-4">
              <input
                type="text"
                className="text-base leading-4 p-4 relative z-0 w-full focus:outline-none text-gray-800 placeholder-gray-800"
                placeholder="Enter your email"
              />
              <div className="cursor-pointer mr-4 cursor-pointer relative z-40">
                <svg
                  className="fill-current text-gray-800 hover:text-gray-500"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <div className="dark:bg-gray-900 bg-green-300">
<div className="container mx-auto relative ">

  <div className="bg-green-300 p-2">
    <div className="container mx-auto flex items-center justify-between">

      <div className="relative group">

        <p
          className={`text-white text-md ${
            isDropdownOpen ? "group-hover:text-gray-200" : ""
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
                <path d="M21 15.61L19.59 17l-5.01-5 5.01-5L21 8.39 17.44 12 21 15.61M3 6h13v2H3V6m0 7v-2h10v2H3m0 5v-2h13v2H3z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M21 18v2H3v-2h18zM17.404 3.904L22 8.5l-4.596 4.596-1.414-1.414L19.172 8.5 15.99 5.318l1.414-1.414zM12 11v2H3v-2h9zm0-7v2H3V4h9z" />
              </svg>
            )}
          </button>
        </p>

        {isDropdownOpen && (
          <div className="absolute mt-6 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href="/buyer/order/products"
              className="block px-4 py-2 text-gray-800 hover:bg-blue-200"
            >
              Buy Goods
            </a>
            <a
              href="/buyer/orders"
              className="block px-4 py-2 text-gray-800 hover:bg-blue-200"
            >
              My Orders
            </a>

          </div>
        )}
      </div>


      <div className=" items-center ">
        <p>
          <span className="text-xl text-white font-bold mt-0 mb-0">
            E-Tabo
          </span>
        </p>
      </div>


      <div className="flex items-center space-x-4">

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


        <a
          href="/buyer/orders"
          className="text-gray-800 hover:text-white"
        >
          <svg
            className="fill-stroke h-8 w-8"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
</div> */
}
