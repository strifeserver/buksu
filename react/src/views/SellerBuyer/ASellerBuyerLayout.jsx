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
  // } else if (userType === 0) {
  //   return <Navigate to="" />;
  // } else if (userType === 1) {
  //   return <Navigate to="/login1" />;
  // } else if (userType === 2) {
  //   return <Navigate to="/login2" />;
  //  if (userType === 3) {
  //   return <Navigate to="/login3" />;
  // }

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
          <div className="py-4 mx-4 md:mx-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-4">
              <div>

                  <p className="text-md text-slate-100 ">Seller & Buyer DASHBOARD</p>


              </div>
              <div className="hidden md:block">
                <ul className="flex items-center space-x-6">
                  <li>
                    <a
                      href="/buyer-seller/dashboard"
                      className="dark:text-white  text-base text-right text-gray-800 focus:outline-none  hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="/buyer-seller/order/products"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                    >
                      Buy Goods
                    </a>
                  </li>
                  <li>
                    <a
                      href="/buyer-seller/farmers/product/"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                    >
                      Farms
                    </a>
                  </li>
                  {/* <li>
                    <a
                      href="/buyer-seller/orders"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                    >
                      Orders
                    </a>
                  </li> */}
                  <li>
                    <a
                      href="/seller/center"
                      className="dark:text-white dark:hover:text-gray-300 text-base text-right text-gray-800  hover:text-white"
                    >
                      Seller Center
                    </a>
                  </li>
                </ul>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <a
                  onClick={onLogoutConfirm}
                  className=" p-0.5 rounded"
                >
                  <svg
                    className="fill-stroke text-gray-800 dark:text-white"
                    width={18}
                    height={20}
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <a
                  title="Cart"
                  href="/buyer-seller/orders"
                  className=" p-0.5 rounded"
                >
                  <svg
                    className="fill-stroke text-gray-800 dark:text-white"
                    width={20}
                    height={22}
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 5H19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <div className="md:hidden">
                <button
                  aria-label="open menu"
                  onClick={() => setShowMenu(true)}
                  className=" rounded"
                >
                  <svg
                    className="fill-stroke text-gray-800 dark:text-white"
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
          </div>
          {/*START MOBILE MENU */}
          <div
            id="mobile-menu"
            className={`${
              showMenu ? "flex" : "hidden"
            } dark:bg-gray-900 md:hidden absolute inset-0 z-10 flex-col w-full h-screen bg-white pt-6`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mx-4">
                <div role="img" aria-label="ETabo. Logo">
                  <svg
                    className="fill-stroke text-gray-800 dark:text-white"
                    width={37}
                    height={17}
                    viewBox="0 0 37 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.76 14.14C3.76 14.6867 3.87333 15.0667 4.1 15.28C4.32667 15.48 4.72 15.58 5.28 15.58V16C4.05333 15.9467 3.24667 15.92 2.86 15.92C2.47333 15.92 1.66667 15.9467 0.44 16V15.58C1 15.58 1.39333 15.48 1.62 15.28C1.84667 15.0667 1.96 14.6867 1.96 14.14V2.72C1.96 2.10667 1.84667 1.66 1.62 1.38C1.39333 1.1 1 0.959999 0.44 0.959999V0.539999C0.853333 0.579999 1.26667 0.599999 1.68 0.599999C2.52 0.599999 3.21333 0.506666 3.76 0.319999V14.14ZM15.3827 13.84C15.3827 14.4533 15.496 14.9 15.7227 15.18C15.9493 15.46 16.3427 15.6 16.9027 15.6V16.02C16.4893 15.98 16.076 15.96 15.6627 15.96C14.8227 15.96 14.1293 16.0533 13.5827 16.24V13.88C13.2627 14.7067 12.8093 15.3133 12.2227 15.7C11.636 16.0867 10.996 16.28 10.3027 16.28C9.39599 16.28 8.70266 16.0267 8.22266 15.52C7.98266 15.2533 7.80932 14.9133 7.70266 14.5C7.60932 14.0867 7.56266 13.5533 7.56266 12.9V7.88C7.56266 7.26667 7.44932 6.82 7.22266 6.54C6.99599 6.26 6.60266 6.12 6.04266 6.12V5.7C6.45599 5.74 6.86932 5.76 7.28266 5.76C8.12266 5.76 8.81599 5.66667 9.36266 5.48V13.34C9.36266 13.8467 9.38932 14.26 9.44266 14.58C9.50932 14.8867 9.64932 15.14 9.86266 15.34C10.0893 15.54 10.4293 15.64 10.8827 15.64C11.3893 15.64 11.8493 15.48 12.2627 15.16C12.676 14.84 12.996 14.4067 13.2227 13.86C13.4627 13.3 13.5827 12.6867 13.5827 12.02V7.88C13.5827 7.26667 13.4693 6.82 13.2427 6.54C13.016 6.26 12.6227 6.12 12.0627 6.12V5.7C12.476 5.74 12.8893 5.76 13.3027 5.76C14.1427 5.76 14.836 5.66667 15.3827 5.48V13.84ZM26.2238 14.58C26.4638 14.9133 26.6638 15.1533 26.8238 15.3C26.9971 15.4333 27.2104 15.5267 27.4638 15.58V16C26.7704 15.9467 26.2971 15.92 26.0438 15.92C25.5904 15.92 24.8038 15.9467 23.6838 16V15.58C23.8971 15.58 24.0771 15.54 24.2238 15.46C24.3838 15.38 24.4638 15.2733 24.4638 15.14C24.4638 15.0467 24.4371 14.9667 24.3838 14.9L22.1038 11.58L20.6438 13.48C20.2704 13.9733 20.0838 14.3733 20.0838 14.68C20.0838 14.96 20.2104 15.18 20.4638 15.34C20.7304 15.4867 21.0971 15.5733 21.5638 15.6V16C20.8704 15.96 20.1104 15.94 19.2838 15.94C18.6971 15.94 18.1904 15.96 17.7638 16V15.6C18.0304 15.5733 18.2971 15.4533 18.5638 15.24C18.8438 15.0267 19.1638 14.68 19.5238 14.2L21.8238 11.18L19.0438 7.12C18.7771 6.73333 18.5638 6.48 18.4038 6.36C18.2438 6.22667 18.0438 6.14667 17.8038 6.12V5.7C18.4971 5.75333 18.9704 5.78 19.2238 5.78C19.6771 5.78 20.4638 5.75333 21.5838 5.7V6.12C21.3704 6.12 21.1838 6.16 21.0238 6.24C20.8771 6.32 20.8038 6.42667 20.8038 6.56C20.8038 6.65333 20.8304 6.73333 20.8838 6.8L23.0238 9.92L24.4038 7.98C24.8038 7.40667 25.0038 6.98667 25.0038 6.72C25.0038 6.53333 24.9104 6.39333 24.7238 6.3C24.5504 6.19333 24.2638 6.12667 23.8638 6.1V5.7C24.5571 5.74 25.1171 5.76 25.5438 5.76C26.1304 5.76 26.6371 5.74 27.0638 5.7V6.1C26.5171 6.16667 25.9304 6.63333 25.3038 7.5L23.2838 10.3L26.2238 14.58ZM36.6428 13.6C36.4028 14.3333 35.9495 14.9667 35.2828 15.5C34.6295 16.02 33.8361 16.28 32.9028 16.28C31.9561 16.28 31.1361 16.0667 30.4428 15.64C29.7495 15.2 29.2161 14.5933 28.8428 13.82C28.4828 13.0333 28.3028 12.1267 28.3028 11.1C28.3028 9.94 28.4895 8.93333 28.8628 8.08C29.2361 7.22667 29.7628 6.57333 30.4428 6.12C31.1228 5.65333 31.9161 5.42 32.8228 5.42C34.0228 5.42 34.9428 5.78667 35.5828 6.52C36.2361 7.24 36.5628 8.34 36.5628 9.82H30.3028C30.2628 10.1933 30.2428 10.62 30.2428 11.1C30.2428 11.98 30.3828 12.7467 30.6628 13.4C30.9561 14.0533 31.3361 14.56 31.8028 14.92C32.2828 15.2667 32.7828 15.44 33.3028 15.44C33.9428 15.44 34.5095 15.2867 35.0028 14.98C35.4961 14.6733 35.9095 14.16 36.2428 13.44L36.6428 13.6ZM32.7428 5.8C32.1161 5.8 31.5761 6.10667 31.1228 6.72C30.6695 7.33333 30.3895 8.24 30.2828 9.44H34.6428C34.6695 8.4 34.5161 7.53333 34.1828 6.84C33.8628 6.14667 33.3828 5.8 32.7428 5.8Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <button
                  aria-label="close menu"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-800 dark:text-white "
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
            <div className="mt-4 mx-4">
              <ul className="flex flex-col space-y-4">
                <li className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <a
                    href=""
                    className="dark:text-white  text-base text-gray-800 hover:underline"
                  >
                    Order
                  </a>
                  <button
                    aria-label="Add"
                    className="dark:text-white text-gray-800  rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.3335V12.6668"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.33203 8H12.6654"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <a
                    href=""
                    className="dark:text-white  text-base text-gray-800 hover:underline"
                  >
                    {" "}
                    Men{" "}
                  </a>
                  <button
                    aria-label="Add"
                    className="dark:text-white text-gray-800  rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.3335V12.6668"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.33203 8H12.6654"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <a
                    href=""
                    className="dark:text-white  text-base text-gray-800 hover:underline"
                  >
                    {" "}
                    Women{" "}
                  </a>
                  <button
                    aria-label="Add"
                    className="dark:text-white text-gray-800  rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.3335V12.6668"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.33203 8H12.6654"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <a
                    href=""
                    className="dark:text-white  text-base text-gray-800 hover:underline"
                  >
                    {" "}
                    Kids{" "}
                  </a>
                  <button
                    aria-label="Add"
                    className="dark:text-white text-gray-800  rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.3335V12.6668"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.33203 8H12.6654"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-700 pb-4 px-1 flex items-center justify-between">
                  <a
                    href=""
                    className="dark:text-white  text-base text-gray-800 hover:underline"
                  >
                    {" "}
                    Magazine{" "}
                  </a>
                  <button
                    aria-label="Add"
                    className="dark:text-white text-gray-800  rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="fill-stroke"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 3.3335V12.6668"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.33203 8H12.6654"
                        stroke="currentColor"
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
                    className="flex items-center space-x-2 focus:outline-none text-gray-800 dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                    href=""
                  >
                    <div>
                      <svg
                        className="fill-stroke"
                        width={18}
                        height={20}
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-base">My account</p>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center space-x-2 focus:outline-none text-gray-800 dark:text-white focus:ring-2 focus:ring-gray-800 hover:underline"
                    href=""
                  >
                    <div>
                      <svg
                        className="fill-stroke"
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.33333 1L1 5V19C1 19.5304 1.23413 20.0391 1.65087 20.4142C2.06762 20.7893 2.63285 21 3.22222 21H18.7778C19.3671 21 19.9324 20.7893 20.3491 20.4142C20.7659 20.0391 21 19.5304 21 19V5L17.6667 1H4.33333Z"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 5H21"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.4436 9C15.4436 10.0609 14.9753 11.0783 14.1418 11.8284C13.3083 12.5786 12.1779 13 10.9991 13C9.82039 13 8.68993 12.5786 7.85643 11.8284C7.02294 11.0783 6.55469 10.0609 6.55469 9"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-base">Bag</p>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center space-x-2 text-gray-800 dark:text-white  hover:underline"
                    href=""
                  >
                    <div>
                      <svg
                        className="fill-stroke"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-base">Favourites</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*END MOBILE MENU */}
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
