import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./views/Admin/Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Signin";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import PendingUsers from "./views/Admin/UsersPending.jsx";
import AllUsers from "./views/Admin/AllUsers.jsx";
import UsersVerified from "./views/Admin/UsersVerified.jsx";
import UserViewVerified from "./views/Admin/UserViewVerified.jsx";



import UserForm from "./views/Admin/UserForm";
import UserFormManage from "./views/Admin/UserFormManage.jsx";
import Products from "./views/Products.jsx";
import Sample from "./views/sample.jsx";

import FarmsPending from "./views/Admin/FarmsPending.jsx";
import FarmsApproved from "./views/Admin/FarmsApproved.jsx";
import FarmFormManage from "./views/Admin/FarmFormManage.jsx";
import FarmViewProducts from "./views/Admin/FarmViewProducts.jsx";

import AddProduct from "./views/Seller/AddProduct.jsx";
import BarangaySupported from "./views/Admin/BarangaySupported.jsx";
import ProductsSupported from "./views/Admin/ProductsSupported.jsx";
import BarangayUpdate from "./views/Admin/BarangayUpdate.jsx";
import PendingOrder from "./views/Seller/PendingOrder.jsx";
import FulfilledOrder from "./views/Seller/FulfilledOrder.jsx";
import CropRecords from "./views/Admin/CropRecords.jsx";
// import AddProd from "./views/Seller/AddProd.jsx";


//BUYER LAYOUT
import BuyerLayout from "./views/Buyers/BuyerLayout.jsx";
import BuyerDashboard from "./views/Buyers/BuyerDashboard.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [

      {
        path: '/',
        element: <Navigate to="admin/dashboard"/>
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
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/sample',
        element: <Sample />
      },

      {
        path: '/products/add',
        element: <AddProduct />
      },
      {
        path: '/orders/pending',
        element: <PendingOrder />
      },
      {
        path: '/orders/fulfilled',
        element: <FulfilledOrder />
      },
      {
        path: 'admin/croprecords',
        element: <CropRecords />
      },
      //Super Admin Pages
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
    element: <BuyerLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="buyer/dashboard"/>
      },
      {
        path: 'buyer/dashboard',
        element: <BuyerDashboard />
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
