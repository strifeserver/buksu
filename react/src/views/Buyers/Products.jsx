import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { Tabs, Button, Spinner, Alert } from "flowbite-react";
import { HiInformationCircle, HiUserCircle } from "react-icons/hi";

export default function AProducts() {
  const { currentUserID } = useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [prodID, setProdID] = useState([]);

  useEffect(() => {
    axiosClient.get("/products").then(({ data }) => {
      setProduct(data);
    });
  }, []);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setLoading(true);
    axiosClient
      .get(`/products`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
        setProdID(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [showAlert, setShowAlert] = useState(false);

  // Auto close the alert after 3 seconds (adjust the duration as needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 4000); //

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [formData, setFormData] = useState({
    productID_: "",
    kg_: "",
    ID_: "",
    variety: "",
    user_ID: currentUserID,
  });
  // console.log("sent");
  const submitToCart = (event) => {
    event.preventDefault();
    axiosClient
      .post("/addToCart", formData) // Replace '/api/submit' with your Laravel API endpoint
      .then((response) => {
        // Handle successful response if needed
        // console.log(response.data);
        console.log("sent");
        console.log(formData);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error submitting form:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <div className=" 2xl:container 2xl:mx-auto">
        <div className=" py-6 lg:px-20 md:px-6 px-4">
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className="items-center"
          >
            <Tabs.Item active icon={HiUserCircle} title="Broccoli">
              <hr className=" w-full bg-gray-200 mt-1" />
              {loading ? (
                <div className="flex items-center justify-center">
                  <Button color="gray">
                    <Spinner aria-label="Alternate spinner button example" />
                    <span className="pl-3 items-center">
                      Getting Products ...
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                  {products.map((u) =>
                    u.product_type === 'Brocollis' ? (
                      <div className="relative" key={u.id}>
                        <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 "></div>
                        <div className="relative group">
                          <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                          <img
                            className="w-96 h-96"
                            src={
                              u.product_picture === ""
                                ? `https://images-na.ssl-images-amazon.com/images/I/71nFvA-EOeL._SL1500_.jpg`
                                : `http://127.0.0.1:8000/storage/Farms/${u.farm_belonged}/${u.product_picture}`
                            }
                            alt="Product Pic"
                          />
                        </div>
                        <p className="font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
                          {u.product_name.toUpperCase()}
                        </p>
                        <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">
                          ₱ {u.price} / Kl
                        </p>
                        <div className="flex flex-row justify-between mt-4">
                          <p className="font-medium text-base leading-4 text-gray-600"></p>
                          <div className="flex">
                            <p>Kilos Available &nbsp;</p>
                            <br />
                            <input
                              id={`counter_${u.id}`}
                              type="number"
                              name={`kg_${u.id}`}
                              value={formData[`kg_${u.id}`] || u.id}
                              onChange={handleChange}
                              min={0}
                              disabled
                              aria-label="input"
                              className="border border-gray-300 h-full text-center w-20 pb-1"
                              required
                            />
                          </div>
                        </div>
                        <a href={`/buyer/order/products/${u.id}`}>
                          <button className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
                            Details
                          </button>
                        </a>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </Tabs.Item>
            <Tabs.Item active icon={HiUserCircle} title="Cabbage">
            <hr className=" w-full bg-gray-200 mt-1" />
              {!loading && (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                  {products.map((u) =>
                    u.product_type === 'Cabbages' ? (
                      <div className="relative" key={u.id}>
                        <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 "></div>
                        <div className="relative group">
                          <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                          <img
                            className="w-96 h-96"
                            src={
                              u.product_picture === ""
                                ? `https://images-na.ssl-images-amazon.com/images/I/71nFvA-EOeL._SL1500_.jpg`
                                : `http://127.0.0.1:8000/storage/Farms/${u.farm_belonged}/${u.product_picture}`
                            }
                            alt="Product Pic"
                          />
                        </div>
                        <p className="font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
                          {u.product_name.toUpperCase()}
                        </p>
                        <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">
                          ₱ {u.price} / Kl
                        </p>
                        <div className="flex flex-row justify-between mt-4">
                          <p className="font-medium text-base leading-4 text-gray-600"></p>
                          <div className="flex">
                            <p>Kilos Available &nbsp;</p>
                            <br />
                            <input
                              id={`counter_${u.id}`}
                              type="number"
                              name={`kg_${u.id}`}
                              value={formData[`kg_${u.id}`] || u.id}
                              onChange={handleChange}
                              min={0}
                              disabled
                              aria-label="input"
                              className="border border-gray-300 h-full text-center w-20 pb-1"
                              required
                            />
                          </div>
                        </div>
                        <a href={`/buyer/order/products/${u.id}`}>
                          <button className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
                            Details
                          </button>
                        </a>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </Tabs.Item>
            <Tabs.Item active icon={HiUserCircle} title="Carrot">
            <hr className=" w-full bg-gray-200 mt-1" />
              {!loading && (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                  {products.map((u) =>
                    u.product_type === 'Carrots' ? (
                      <div className="relative" key={u.id}>
                        <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 "></div>
                        <div className="relative group">
                          <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                          <img
                            className="w-96 h-96"
                            src={
                              u.product_picture === ""
                                ? `https://images-na.ssl-images-amazon.com/images/I/71nFvA-EOeL._SL1500_.jpg`
                                : `http://127.0.0.1:8000/storage/Farms/${u.farm_belonged}/${u.product_picture}`
                            }
                            alt="Product Pic"
                          />
                        </div>
                        <p className="font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
                          {u.product_name.toUpperCase()}
                        </p>
                        <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">
                          ₱ {u.price} / Kl
                        </p>
                        <div className="flex flex-row justify-between mt-4">
                          <p className="font-medium text-base leading-4 text-gray-600"></p>
                          <div className="flex">
                            <p>Kilos Available &nbsp;</p>
                            <br />
                            <input
                              id={`counter_${u.id}`}
                              type="number"
                              name={`kg_${u.id}`}
                              value={formData[`kg_${u.id}`] || u.id}
                              onChange={handleChange}
                              min={0}
                              disabled
                              aria-label="input"
                              className="border border-gray-300 h-full text-center w-20 pb-1"
                              required
                            />
                          </div>
                        </div>
                        <a href={`/buyer/order/products/${u.id}`}>
                          <button className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
                            Details
                          </button>
                        </a>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </Tabs.Item>
            <Tabs.Item active icon={HiUserCircle} title="Tomato">
            <hr className=" w-full bg-gray-200 mt-1" />
              {!loading && (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                  {products.map((u) =>
                    u.product_type === 'Tomatoes' ? (
                      <div className="relative" key={u.id}>
                        <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 "></div>
                        <div className="relative group">
                          <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                          <img
                            className="w-96 h-96"
                            src={`http://127.0.0.1:8000/storage/Farms/${u.farm_belonged}/${u.product_picture}`}

                            alt="Product Pic"
                          />
                        </div>
                        <p className="font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
                          {u.product_name.toUpperCase()}
                        </p>
                        <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">
                          ₱ {u.price} / Kl
                        </p>
                        <div className="flex flex-row justify-between mt-4">
                          <p className="font-medium text-base leading-4 text-gray-600"></p>
                          <div className="flex">
                            <p>Kilos Available &nbsp;</p>
                            <br />
                            <input
                              id={`counter_${u.id}`}
                              type="number"
                              name={`kg_${u.id}`}
                              value={formData[`kg_${u.id}`] || u.id}
                              onChange={handleChange}
                              min={0}
                              disabled
                              aria-label="input"
                              className="border border-gray-300 h-full text-center w-20 pb-1"
                              required
                            />
                          </div>
                        </div>
                        <a href={`/buyer/order/products/${u.id}`}>
                          <button className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
                            Details
                          </button>
                        </a>
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </Tabs.Item>
          </Tabs.Group>

          {/* {showAlert && (
          <Alert color="success" icon={HiInformationCircle} rounded>
            <span>
              <p>
                <span className="font-medium">Info alert!</span>
                Change a few things up and try submitting again.
              </p>
            </span>
          </Alert>
        )} */}
        </div>
      </div>
    </>
  );
}
