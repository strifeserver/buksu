import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Farms from "./views/Farms.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Products from "./views/Products.jsx";
import Sample from "./views/sample.jsx";

import AddProduct from "./views/Seller/AddProduct.jsx";
import BarangaySupported from "./views/Admin/BarangaySupported.jsx";
import ProductsSupported from "./views/Admin/ProductsSupported.jsx";
import UpdateBarangay from "./views/Admin/UpdateBarangay.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
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
      //Super Admin Pages
      {
        path: '/admin/supported/barangay',
        element: <BarangaySupported />
      },
      {
        path: '/barangays/:id',
        element: <UpdateBarangay />
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
