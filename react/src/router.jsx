import {createBrowserRouter, Navigate, Route} from "react-router-dom";

//GUESTS NOT LOGGED IN || GENERAL PAGES
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Signin";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";

//DA ADMIN PAGES
import AdminLayout from "./views/Admin/AdminLayout.jsx";
import Dashboard from "./views/Admin/Dashboard.jsx";

import AllUsers from "./views/Admin/AllUsers.jsx"; //USERS
import PendingUsers from "./views/Admin/UsersPending.jsx";
import UsersVerified from "./views/Admin/UsersVerified.jsx";
import UserViewVerified from "./views/Admin/UserViewVerified.jsx";
import UserForm from "./views/Admin/UserForm";
import UserFormManage from "./views/Admin/UserFormManage.jsx";
import Products from "./views/SellerBuyer/Products.jsx";

import FarmsPending from "./views/Admin/FarmsPending.jsx"; //FARMS
import FarmsApproved from "./views/Admin/FarmsApproved.jsx";
import FarmFormManage from "./views/Admin/FarmFormManage.jsx";
import FarmViewProducts from "./views/Admin/FarmViewProducts.jsx";
import FarmersProfile from "./views/Admin/FarmersProfile.jsx";
import FarmersProfileInfo from "./views/Admin/FarmersProfileInfo.jsx";

import ProductsPending from "./views/Admin/ProductsPending.jsx";
import ProductFormManage from "./views/Admin/ProductFormManage.jsx";
import ProductsApproved from "./views/Admin/ProductsApproved.jsx";
import ProductsFormView from "./views/Admin/ProductFormView.jsx";

import CropPredictiveAnalysis from "./views/Admin/CropPredictiveAnalysis.jsx";
import BarangaySupported from "./views/Admin/BarangaySupported.jsx";
import ProductsSupported from "./views/Admin/ProductsSupported.jsx";
import BarangayUpdate from "./views/Admin/BarangayUpdate.jsx";

//SELLER BUYER-  PAGES

import SellerBuyerLayout from "./views/SellerBuyer/SellerBuyerLayout";
import SellerBuyerDashboard from "./views/SellerBuyer/Dashboard"
import ProductAdd from "./views/SellerBuyer/ProductAdd.jsx";
import ProductListsSB from "./views/SellerBuyer/ProductListsSB.jsx"
import FarmListBySeller from "./views/SellerBuyer/FarmsBySeller.jsx"
import ProductOrder from "./views/SellerBuyer/FarmProductOrders";

// import FarmProductOrders from "./views/SellerBuyer/FarmProductOrders.jsx";
import FulfilledOrder from "./views/SellerBuyer/FulfilledOrder.jsx";
import FulfilledOrderConfirm from "./views/SellerBuyer/FulfilledOrderConfirm.jsx";
import FarmProductOrderLists from "./views/SellerBuyer/OrderListsByFarm.jsx";

import CropRecords from "./views/Admin/CropRecords.jsx";

// import AddProd from "./views/Seller/AddProd.jsx";


//SELLER-  PAGES


//BUYER-  PAGES

//BUYER LAYOUT
import Sample from "./views/sample.jsx";
import PendingOrders from "./views/SellerBuyer/PendingOrders";

//StateContext
// import { useStateContext } from "./context/ContextProvider.jsx";
// export default function DefaultLayout() {
//   const {
//     user Type,
//     setUserType,
//   } = useStateContext();

// const user_type = {userType};

// const ProtectedRoute = ({ allowedUserType, ...props }) => {
//   if (user_type === allowedUserType) {
//     return <Route {...props} />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

const router = createBrowserRouter([
  //ADMIN DA
  {
    path: '/',
    element: <AdminLayout />,
    children: [

      {
        path: '/',
        element: <Navigate to="admin/dashboard"/>
        // element: <ProtectedRoute allowedUserType={3} path='/' element={<PendingUsers />}
      },
      {
        path: 'admin/dashboard',
        element: <Dashboard />
      },
      {                               //USERS
        path: 'admin/users/pending',
        element: <PendingUsers />
      },
      {
        path: 'admin/users/verified',
        element: <UsersVerified />
      },
      {
        path: 'admin/users/all',
        element: <AllUsers />
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/admin/users/view/:id',
        element: <UserViewVerified />
      },
      {
        path: '/admin/users/manage/:id',
        element: <UserFormManage />
      },

      {
        path: '/admin/pending/user/:id',
        element: <UserForm key="userUpdate" />
      },
      {                             //FARMS
        path: '/admin/farms/pending',
        element: <FarmsPending />
      },
      {
        path: '/admin/farms/approved',
        element: <FarmsApproved />
      },
      {
        path: '/admin/farms/pending/:id',
        element: <FarmFormManage />
      },
      {
        path: 'admin/farms/approved/:id',
        element: <FarmViewProducts />
      },
      {                         //Products
        path: '/admin/products/pending',
        element: <ProductsPending />
      },
      {
        path: '/admin/products/approved',
        element: <ProductsApproved />
      },
      {
        path: '/admin/product/pending/:id',
        element: <ProductFormManage />
      },
      {
        path: '/admin/farmers/profile/',
        element: <FarmersProfile />
      },
      {
        path: '/admin/farm/:id',
        element: <FarmersProfileInfo />
      },
      {
        path: 'admin/croprecords',
        element: <CropPredictiveAnalysis />
      },
      {
        path: '/admin/supported/barangay',
        element: <BarangaySupported />
      },
      {
        path: '/barangays/:id',
        element: <BarangayUpdate />
      },
      {
        path: '/admin/supported/products',
        element: <ProductsSupported />
      },

    ]
  }, //BUYERS


  {
    path: '/',
    element: <SellerBuyerLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/buyer-seller/dashboard"/>
      },
      {
        path: '/buyer-seller/dashboard',
        element: <Dashboard />
      },
      {
        path: '/buyer-seller/product/add',
        element: <ProductAdd />
      },
      {
        path: '/buyer-seller/farms/owned',
        element: <FarmListBySeller />
      },
      // {
      //   pa th: '/buyer-seller/products/lists',
      //   element: <ProductListsSB />
      // },
      {
        path: '/buyer-seller/farm/:id',
        element: <ProductListsSB />
      },
      {
        path: '/buyer-seller/order/products',
        element: <Products />
      },
      {
        path: '/buyer-seller/order/products/:id',
        element: <ProductOrder />
      },
      {
        path: '/buyer-seller/farm/product/orders',
        element: <FarmProductOrderLists />
      },
      {
        path: '/buyer-seller/orders/pending',
        element: <PendingOrders />
      },
      {
        path: '/buyer-seller/orders/fulfilled',
        element: <FulfilledOrder />
      },
      {
        path: '/buyer-seller/order/confirm/:id',
        element: <FulfilledOrderConfirm />
      },
      {
        path: '/sample',
        element: <Sample />
      },

    ]
  },


  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }

])

export default router;
