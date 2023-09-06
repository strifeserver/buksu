import { Navigate, Outlet, useNavigate} from "react-router-dom";

import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider";

export default function SellerBuyerlayout() {
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

  if (!token ) {
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

  // const onLogout = (ev) => {
  //   ev.preventDefault();

  //   axiosClient.post("/logout").then(() => {
  //     setToken(null);
  //     setUserName(null);
  //     setCurrentUserID(null);
  //     setUserType(null);
  //    navigate("/login003");
  //   });
  // };

  return (
    <div>
      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        {/* Sidebar starts */}
        {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
        <div className="w-52 absolute sm:relative bg-green-500 shadow md:h-full flex-col justify-between flex">
          <div>
            <div className="flex items-center mt-10 mb-0 px-8">
              <div className="w-10 h-10 bg-cover rounded-md mr-3">
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_5.png"
                  alt
                  className="rounded-full h-full w-full overflow-hidden shadow"
                />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">{userName}</p>
                <p className="text-gray-600 text-xs">Buyer / Seller</p>
              </div>
            </div>
            <ul className="mt-6">
            <a href="/buyer-seller/dashboard">
                <li className="flex w-full justify-between text-white hover:text-gray-300 hover:bg-green-600 cursor-pointer items-center py-3 px-8">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-grid"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x={4} y={4} width={6} height={6} rx={1} />
                      <rect x={14} y={4} width={6} height={6} rx={1} />
                      <rect x={4} y={14} width={6} height={6} rx={1} />
                      <rect x={14} y={14} width={6} height={6} rx={1} />
                    </svg>
                    <span className="text-sm  ml-2">Dashboard</span>
                  </div>
                </li>
              </a>
              <a href="/buyer-seller/product/add">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-puzzle"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                    </svg>
                    <span className="text-sm  ml-2">Add Product</span>
                  </div>
                </li>
              </a>

              <a href="/buyer-seller/farm/add">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-code"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="7 8 3 12 7 16" />
                      <polyline points="17 8 21 12 17 16" />
                      <line x1={14} y1={4} x2={10} y2={20} />
                    </svg>
                    <span className="text-sm  ml-2">Add Farm</span>
                  </div>
                </li>
              </a>
              <a href="/buyer-seller/farms/owned">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-code"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="7 8 3 12 7 16" />
                      <polyline points="17 8 21 12 17 16" />
                      <line x1={14} y1={4} x2={10} y2={20} />
                    </svg>
                    <span className="text-sm  ml-2">Farms</span>
                  </div>
                </li>
              </a>

              <a href="/buyer-seller/farm/product/orders">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-code"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="7 8 3 12 7 16" />
                      <polyline points="17 8 21 12 17 16" />
                      <line x1={14} y1={4} x2={10} y2={20} />
                    </svg>
                    <span className="text-sm  ml-2">Farm Orders</span>
                  </div>
                </li>
              </a>
              <a href="/farmers/profile/">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600 cursor-pointer items-center  px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M8 11a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="currentColor"
                        d="M11 14a1 1 0 011 1v6h2v-6a3 3 0 00-3-3H5a3 3 0 00-3 3v6h2v-6a1 1 0 011-1h6zM22 11h-6v2h6v-2zM16 15h6v2h-6v-2zM22 7h-6v2h6V7z"
                      />
                    </svg>
                    <span className="text-sm  ml-2">&nbsp;Farmers Profile</span>
                  </div>
                </li>
              </a>
              <a href="/buyer-seller/order/products">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-stack"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 4 4 8 12 12 20 8 12 4" />
                      <polyline points="4 12 12 16 20 12" />
                      <polyline points="4 16 12 20 20 16" />
                    </svg>
                    <span className="text-sm  ml-2">Order Products</span>
                  </div>
                </li>
              </a>
              <a href="/buyer-seller/orders/pending">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-stack"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 4 4 8 12 12 20 8 12 4" />
                      <polyline points="4 12 12 16 20 12" />
                      <polyline points="4 16 12 20 20 16" />
                    </svg>
                    <span className="text-sm  ml-2">Pending Orders</span>
                  </div>
                </li>
              </a>
              <a href="/buyer-seller/orders/fulfilled">
                <li className="flex w-full justify-between  text-white hover:text-gray-300 hover:bg-green-600  cursor-pointer items-center px-8 py-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-stack"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="12 4 4 8 12 12 20 8 12 4" />
                      <polyline points="4 12 12 16 20 12" />
                      <polyline points="4 16 12 20 20 16" />
                    </svg>
                    <span className="text-sm  ml-2">Fulfilled Orders</span>
                  </div>
                </li>
              </a>




            </ul>
          </div>
          <div className="px-8 bg-indigo-800">
            <ul className="w-full flex items-center justify-between ">
              <li className="cursor-pointer text-white pt-5 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-bell"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
              </li>

              <li className="cursor-pointer text-white pt-5 pb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-archive"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <rect x={3} y={4} width={18} height={4} rx={2} />
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                  <line x1={10} y1={12} x2={14} y2={12} />
                </svg>
              </li>
              <li className="cursor-pointer text-white pt-5 pb-3">
                <a onClick={onLogoutConfirm}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar ends */}
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
          {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
          <div className="w-full h-full rounded border-dashed border-2 border-gray-300">
            {/* Place your content here */}
          </div>
        </div>
        {/* </div> */}
        {/* </div>
          </div> */}

        {/* </div> */}
      </aside>

      <div className="p-0 sm:ml-64">
        <div className="p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
