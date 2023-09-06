import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea, Table, Tabs } from "flowbite-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HiInformationCircle, HiUserCircle } from "react-icons/hi";


export default function AProductOrder() {
  const [loading, setLoading] = useState(false);
  const { currentUserID } = useStateContext();
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState();

  const navigate = useNavigate();
  let { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    setLoading(true);
    axiosClient
      .get(`/getProductToOrder/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setPrice(data.price);
        setProduct(data);
        setUserType(data.user_type);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const submitToCart = (event) => {
    event.preventDefault();
    axiosClient
      .post("/orderNow", formData)
      .then(() => {
        window.location.href = "/buyer/orders";
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error submitting form:", error);
      });
  };

  const [formData, setFormData] = useState({
    productID_: id,
    kg_: "",
    user_ID: currentUserID,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  return (

    <div>
       <Tabs.Group
    aria-label="Tabs with underline"
    style="underline"
    className="items-center"
  >
    <Tabs.Item active icon={HiUserCircle} title="Order Now">
      <div className="">
        {/* <div className="w-1/2 h-screen bg-gray-100">

        </div> */}
        <div className="w-full h-screen bg-slate-100 mt-0 p-16">
          <form onSubmit={submitToCart}>
            {product.map((u) => (
              <div className="relative">
                <div className=" absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 "></div>
                <div className=" relative group">
                  <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full self-center object-center"></div>
                  <img
                    className="w-96 h-96 "
                    src="https://images-na.ssl-images-amazon.com/images/I/71nFvA-EOeL._SL1500_.jpg"
                    alt="Cabbage"
                  />
                </div>

                <p className=" font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
                  {u.product_name.toUpperCase()}
                </p>
                <p className=" font-normal  leading-5 text-gray-800 md:mt-5 mt-3">
                  AVAILABLE Kls:{" "}
                  <span className="font-xl text-blue-500">
                    {" "}
                    {u.prospect_harvest_in_kg - u.actual_sold_kg}
                  </span>
                </p>
                <p className=" font-semibold text-xl leading-5 text-gray-800 mt-4">
                  ₱ {u.price} / Kl
                </p>
                <div className="flex flex-row justify-between mt-4">
                  <p className=" font-medium text-base leading-4 text-gray-600"></p>
                  <div className="flex">
                    <p>Select Kilo &nbsp;</p>
                    <br />

                    <input type="text" name="product_ID" value={u.id} hidden />
                    <input
                      id="counter"
                      name="kg_"
                      type="number"
                      // name={`kg_${u.id}`}
                      // value={formData[`kg_${u.id}`] || u.id}
                      onChange={handleChange}
                      min={1}
                      max={u.prospect_harvest_in_kg - u.actual_sold_kg}
                      aria-label="input"
                      className="border border-gray-300 h-full text-center w-15 pb-1"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2"
                >
                 Order Now
                </button>
              </div>
            ))}
          </form>
        </div>
      </div>
      </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
