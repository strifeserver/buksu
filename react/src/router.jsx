import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Admin/Users.jsx";
import UserForm from "./views/UserForm";
import Products from "./views/Products.jsx";
import Sample from "./views/sample.jsx";

import Farms from "./views/Seller/Farms.jsx";
import AddProduct from "./views/Seller/AddProduct.jsx";
import BarangaySupported from "./views/Admin/BarangaySupported.jsx";
import ProductsSupported from "./views/Admin/ProductsSupported.jsx";
import BarangayUpdate from "./views/Admin/BarangayUpdate.jsx";
import PendingOrder from "./views/Seller/PendingOrder.jsx";
import FulfilledOrder from "./views/Seller/FulfilledOrder.jsx";
import CropRecords from "./views/Admin/CropRecords.jsx";
// import AddProd from "./views/Seller/AddProd.jsx";


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
        element: <Dashboard/>
      },
      {
        path: 'admin/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
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
        path: '/farms',
        element: <Farms />
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
