import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AProductOrder() {
  const [loading, setLoading] = useState(false);
  const { currentUserID, userType } = useStateContext();
  console.log(currentUserID)
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState();
  const navigate = useNavigate();
  let { id } = useParams();
  const [max, setMax] = useState();
  const denominations = [1, 5, 10, 20, 30, 50, 100, 500, 1000];
  const [count, setCount] = useState(1);
  const maximumValue = max;

  const handleChange = (event) => {
    setCount(event.target.value);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    setLoading(true);
    axiosClient
      .get(`/getProductToOrder/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setMax(data.maximum);
        setProduct(data.product);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const submitToCart = (event) => {
    event.preventDefault();

    if (count <= maximumValue) {
      const updatedFormData = {
        productID_: id,
        kg_: count,
        user_ID: currentUserID,
      };

      axiosClient
        .post("/cart", updatedFormData)
        .then(() => {
          if (userType == 1) {
            window.location.href = "/buyer-seller/cart";
          }
          if (userType == 0) {
            window.location.href = "/buyer/cart";
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Quantity exceeds maximum value.",
      });
    }
  };

  const setCountValue = (value) => {
    setCount(value + count);
  }

  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
      <form onSubmit={submitToCart}>
        {product.map((u) => (
          <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
            <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
              <div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
                <img src={`http://127.0.0.1:8000/storage/Farms/${u.farm_belonged}/${u.product_picture}`} alt="Product Pic" />
              </div>
            </div>
            <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
              <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{u.product_name}</h2>

              <div className=" flex flex-row justify-between  mt-5">
                <div className=" flex flex-row space-x-3">
                  <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600" >
                    Variety : <strong> {u.variety}</strong>
                  </p>
                </div>
                <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer"><strong>FARM : </strong> {u.farm.farm_name}</p>
              </div>

              <p className=" font-normal text-base leading-6 text-gray-600 mt-7">
                Planted Date : <strong>{u.planted_date}</strong>

              </p>
              <p className=" font-normal text-base leading-6 text-gray-600 mt-1">
                Available Kilos : <strong>  {u.prospect_harvest_in_kg - u.actual_sold_kg}</strong>

              </p>
              <p className=" font-normal text-base leading-6 text-gray-600 mt-1">
                Seller: <strong> {u.farm.user.name}</strong> <span className="italic">{u.farm.user.mobile_number}</span>

              </p>
              <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">₱ {u.price}.00</p>

              <div className="lg:mt-11 mt-10">
                <div className="flex flex-row justify-between">
                  <p className=" font-medium text-base leading-4 text-gray-600">Add Kilos :</p>
                  <div className="flex">
                    <input required id="counter" name="kg_" aria-label="input" className="border border-gray-300 h-full text-center w-full pb-1" type="number" max={u.prospect_harvest_in_kg - u.actual_sold_kg} min={1} value={count} onChange={handleChange} />
                  </div>
                </div>
                {
                  denominations.map((value) => {
                    return (
                      <a onClick={() => setCountValue(value)} key={value} className="ml-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 w-14 h-7 text-center bg-green-100">{value}</a>
                    )
                  })
                }

                <hr className=" bg-gray-200 w-full my-2" />
                <div className=" flex flex-row justify-between items-center mt-4">
                  <p className="font-medium text-base leading-4 text-gray-600">Location : </p>
                  {u.farm.farm_location}
                </div>
                <hr className=" bg-gray-200 w-full mt-4" />
              </div>
              <input type="text" name="product_ID" value={u.id} hidden />

              <button type="submit" className="focus:outline-none focus:ring-2 hover:bg-green-400 focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-green-600 w-full py-5 lg:mt-12 mt-6">Add to Cart</button>
            </div>
          </div>
        ))}
      </form>


    </div>
  );
}
