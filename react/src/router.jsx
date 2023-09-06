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

;

// import SellerBuyerLayout from "./views/SellerBuyer/SellerBuyerLayout";
import SellerBuyerDashboard from "./views/SellerBuyer/ABuyerSellerDashboard"
import ProductAdd from "./views/SellerBuyer/ProductAdd.jsx";
import FarmListBySeller from "./views/SellerBuyer/FarmsBySeller.jsx"
import ProductOrder from "./views/SellerBuyer/AProductOrder";

// import FarmProductOrders from "./views/SellerBuyer/FarmProductOrders.jsx";
import FulfilledOrder from "./views/SellerBuyer/FulfilledOrder.jsx";
import FulfilledOrderConfirm from "./views/SellerBuyer/FulfilledOrderConfirm.jsx";
import FarmProductOrderLists from "./views/SellerBuyer/OrderListsByFarm.jsx";

import CropRecords from "./views/Admin/CropRecords.jsx";

// import AddProd from "./views/Seller/AddProd.jsx";

//SELLER BUYER-  PAGES
import Products from "./views/SellerBuyer/AProducts.jsx";
import BuyerSellerDashboard from "./views/SellerBuyer/ABuyerSellerDashboard";
import SellerBuyerlayout from "./views/SellerBuyer/ASellerBuyerLayout";
import ConfirmOrder from "./views/SellerBuyer/AConfirmOrder.jsx";
import FarmersProduct from "./views/SellerBuyer/AFarmersProduct.jsx";
import FarmViewProductsSB from "./views/SellerBuyer/AFarmViewProductsSB.jsx"
import SellerCenter from "./views/SellerBuyer/ASellerCenter.jsx"
import AddFarm from "./views/SellerBuyer/AAddFarm.jsx"
import ConfirmDelivery from "./views/SellerBuyer/AConfirmDelivery.jsx"

//BUYER LAYOUT
import Sample from "./views/sample.jsx";
import Orders from "./views/SellerBuyer/AOrders";

import BuyerLayout from "./views/Buyers/BuyerLayout";
import BuyerDashboard from "./views/Buyers/BuyerDashboard";
import ListsProduct from "./views/Buyers/Products";
import ProductOrderNow from "./views/Buyers/ProductOrder";
import OrdersLists from "./views/Buyers/Orders.jsx";

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

      {
        path: '/admin/products/setPrice',
        element: <ProductsSupported />
      },

    ]
  },

  //BUYERS

  {
    path: '/',
    element: <BuyerLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/buyer/dashboard"/>
      },
      {
        path: '/buyer/dashboard',
        element: <BuyerDashboard />
      },
      {
        path: '/buyer/order/products',
        element: <ListsProduct />
      },
      {
        path: '/buyer/order/products/:id',
        element: <ProductOrderNow />
      },
      {
        path: '/buyer/orders', //orderlists
        element: <OrdersLists />
      },
    ]
  },

  {
    path: '/',
    element: <SellerBuyerlayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/buyer-seller/dashboard"/>
      },
      {
        path: '/buyer-seller/dashboard',
        element: <BuyerSellerDashboard />
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
        path: '/buyer-seller/orders', //orderlists
        element: <Orders />
      },
      {
        path: '/buyer-seller/order/confirm/:id', //confirm Order
        element: <ConfirmOrder />
      },
      {
        path: '/buyer-seller/farmers/product/',
        element: <FarmersProduct />
      },
      {
        path: '/buyer-seller/farmers/product/', //FARM LISts per barangay
        element: <FarmersProduct />
      },
      {
        path: '/buyer-seller/farm/:id', //viewProductsByFarm
        element: <FarmViewProductsSB />
      },
      {
        path: '/seller/center', //viewProductsByFarm
        element: <SellerCenter />
      },
      {
        path: '/buyer-seller/product/add',
        element: <ProductAdd />
      },
      {
        path: '/buyer-seller/farms/owned',
        element: <FarmListBySeller />
      },
      {
        path: '/buyer-seller/order/delivered/:id',
        element: <ConfirmDelivery />
      },
      // {
      //   pa th: '/buyer-seller/products/lists',
      //   element: <ProductListsSB />
      // },



      {
        path: '/buyer-seller/farm/product/orders',
        element: <FarmProductOrderLists />
      },

      {
        path: '/buyer-seller/order/confirm/:id',
        element: <FulfilledOrderConfirm />
      },

      {
        path: '/seller/center/addFarm',
        element: <AddFarm />
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
