import { Link, Navigate, Outlet, Routes, Route } from "react-router-dom";

import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";

import { Button, Navbar } from "flowbite-react";

const NavBar = () => {
  const { token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };
  return (
    <div className="bg-slate-100 min-w-screen">
      <Navbar fluid rounded className="bg-slate-200">
        <Navbar.Brand href="https://flowbite-react.com">
          <img
            alt="Flowbite React Logo"
            className="mr-3 h-6 sm:h-9"
            src="https://flowbite.com/images/technologies/tailwind.svg"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            E-tabo
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Link onClick={onLogout}>
            <Button>Logout</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/dashboard">
            <Navbar.Link>Farms</Navbar.Link>
          </Link>
          <Link to="/users">
            {" "}
            <Navbar.Link>Sellers</Navbar.Link>
          </Link>
          <Link to="/products">
            <Navbar.Link>Products</Navbar.Link>
          </Link>
          <Navbar.Link>About</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
