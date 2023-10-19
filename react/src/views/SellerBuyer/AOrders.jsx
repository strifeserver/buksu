import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Table, Tabs, Button, Spinner, Alert } from "flowbite-react";
import { HiInformationCircle, HiUserCircle } from "react-icons/hi";

export default function AOrders() {
  const { currentUserID } = useStateContext();
  const payload = {
    user_ID: currentUserID,
  };

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    axiosClient
      .post("getOrders", payload)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (data === null) {
    return (
      <div className="text-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (data.userPendingOrders === undefined) {
    return <div>Loading ...</div>;
  }

  const handleCancelOrder = (transactionId) => {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (shouldCancel) {
      window.location.href = `/buyer-seller/order/cancel/${transactionId}`;
    }
  };

  return (
    <>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        className="items-center"
      >
        <Tabs.Item active icon={HiUserCircle} title="Pending Orders">
          <div className="bg-gray-100 w-full">
            <p className="text-center mt-3">Pending Orders</p>
            <p className="text-xs mt-0 mb-6 text-center italic">
              Orders that are to be delivered are shown here:
            </p>
            {data.userPendingOrders.map((order) => (
              <div className="bg-slate-200" key={order.id}>
                {order.transactions.map(
                  (transaction) =>
                    transaction.price_payed === null && transaction.price_of_goods !== -1 ? (
                      <div
                        key={transaction.id}
                        className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"
                        style={{ borderTop: "1px solid #000" }}
                      >
                        {transaction.transaction_detail.map((detail) => (
                          <div className="mt-0 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 bg-slate-300">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                  Transaction No: {transaction.id}
                                </p>

                                <div className="mt-0 md:mt-2 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                  <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img
                                      className="w-full hidden md:block"
                                      src={`http://127.0.0.1:8000/storage/Farms/${detail.product_ordered.farm_belonged}/${detail.product_ordered.product_picture}`}
                                    />
                                  </div>
                                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                        <span>{detail.product_name}</span>
                                      </h3>
                                      <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Variety:{" "}
                                          </span>
                                          {detail.variety}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Planted :{" "}
                                          </span>
                                          {detail.planted_date}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Harvested:{" "}
                                          </span>
                                          {detail.harvested_date}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                      <p className="text-base xl:text-lg leading-6">
                                        ₱ {detail.price_per_kilo} /Kl
                                      </p>
                                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                                        {detail.kg_purchased} Kl
                                      </p>
                                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                        ₱{" "}
                                        {detail.price_per_kilo *
                                          detail.kg_purchased}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Summary
                                  </h3>
                                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                      <p className="text-base leading-4 text-gray-800">
                                        Subtotal
                                      </p>
                                      <p className="text-base leading-4 text-gray-600">
                                        ₱{" "}
                                        {detail.price_per_kilo *
                                          detail.kg_purchased}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-semibold leading-4 text-gray-800">
                                      Total
                                    </p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">
                                      ₱{" "}
                                      {detail.price_per_kilo *
                                        detail.kg_purchased}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Order Status :{" "}
                                    <span className="text-sm border-y-orange-400">
                                      {" "}
                                      PENDING{" "}
                                    </span>
                                  </h3>
                                  <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                      <div class="w-8 h-8">
                                        <img
                                          class="w-full h-full"
                                          alt="logo"
                                          src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-green-800">
                                          Date to Receive
                                          <br />
                                          <span className="font-normal">
                                            {
                                              transaction.seller_prospect_date_todeliver
                                            }
                                          </span>
                                        </p>

                                        <div key={transaction.id}>
                                        {/* <p>Press this if you want to cancel Order</p> */}
                                          <button
                                            className="rounded-lg focus:outline-none focus:ring-2 hover:bg-red-400 focus:ring-offset-2 font-medium text-base leading-4 text-white bg-w-full  lg:mt-4 mt-2 bg-red-600 p-4"
                                            onClick={() =>
                                              handleCancelOrder(transaction.id)
                                            }
                                          >
                                            Cancel Order
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null //
                )}
              </div>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item active icon={HiUserCircle} title="Delivered Orders">
          <div className="bg-gray-100 w-full">
            <p className="text-center mt-3">Delivered Orders</p>
            <p className="text-xs mt-0 mb-6 text-center italic">
              Delivered Orders that requires your confirmation:
            </p>
            {data.userPendingOrders.map((order) => (
              <div className="bg-slate-200" key={order.id}>
                {order.transactions.map(
                  (transaction) =>
                    transaction.price_payed != null &&
                    transaction.payed_on === null ? (
                      <div
                        key={transaction.id}
                        className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"
                        style={{ borderTop: "1px solid #000" }}
                      >
                        {transaction.transaction_detail.map((detail) => (
                          <div className="mt-0 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 bg-slate-300">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                  Transaction No: {transaction.id}
                                </p>

                                <div className="mt-0 md:mt-2 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                  <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img
                                      className="w-full hidden md:block"
                                      src={`http://127.0.0.1:8000/storage/Farms/${detail.product_ordered.farm_belonged}/${detail.product_ordered.product_picture}`}
                                    />
                                  </div>
                                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                        <span>{detail.product_name}</span>
                                      </h3>
                                      <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Variety:{" "}
                                          </span>
                                          {detail.variety}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Planted :{" "}
                                          </span>
                                          {detail.planted_date}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Harvested:{" "}
                                          </span>
                                          {detail.harvested_date}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                      <p className="text-base xl:text-lg leading-6">
                                        ₱ {detail.price_per_kilo} /Kl
                                      </p>
                                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                                        {detail.kg_purchased} Kl
                                      </p>
                                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                        ₱{" "}
                                        {detail.price_per_kilo *
                                          detail.kg_purchased}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Summary
                                  </h3>
                                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                      <p className="text-base leading-4 text-gray-800">
                                        Subtotal
                                      </p>
                                      <p className="text-base leading-4 text-gray-600">
                                        ₱{" "}
                                        {detail.price_per_kilo *
                                          detail.kg_purchased}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-semibold leading-4 text-gray-800">
                                      Total
                                    </p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">
                                      ₱{" "}
                                      {detail.price_per_kilo *
                                        detail.kg_purchased}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Order Status : <br />
                                    <span className="text-sm border-y-orange-400 bg-green-300">
                                      Successfully DELIVERED{" "}
                                    </span>
                                  </h3>
                                  <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                      <div class="w-8 h-8">
                                        <img
                                          class="w-full h-full"
                                          alt="logo"
                                          src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-green-800">
                                          Order Delivered Date
                                          <br />
                                          <span className="font-normal">
                                            {transaction.date_delivered}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* //Third box */}
                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    OPTIONS:{" "}
                                    <span className="text-sm border-y-orange-400">
                                      {" "}
                                      SELECT Below
                                    </span>
                                  </h3>

                                  <div className="items-center">
                                    <a
                                      target="_blank"
                                      href={`http://127.0.0.1:8000/storage/ProofOfDelivery/${transaction.proof_of_delivery}`}
                                    >
                                      {" "}
                                      <button className="rounded-lg focus:outline-none focus:ring-2 hover:bg-yellow focus:ring-offset-2 focus:ring-yellow-600 font-medium text-base leading-4 text-white bg-yellow-600 w-full py-4 lg:mt-4 mt-2">
                                        Pic of Delivery
                                      </button>
                                    </a>

                                    <a
                                      href={`/buyer-seller/order/confirm/${transaction.id}`}
                                    >
                                      <button className="rounded-lg focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
                                        Confirm Recieved
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null //
                )}
              </div>
            ))}
          </div>
        </Tabs.Item>
        {/* SECOND TAB */}
        <Tabs.Item active icon={HiUserCircle} title="Successful Orders">
          <div className="bg-gray-100 w-full">
            <p className="text-center mt-3">Fulfilled Orders</p>
            <p className="text-xs mt-0 mb-6 text-center italic">
              All Delivered and Confirmed Orders Appear here:
            </p>
            {data.userPendingOrders.map((order) => (
              <div className="bg-slate-200" key={order.id}>
                {order.transactions.map(
                  (transaction) =>
                    transaction.payed_on != null ? (
                      <div
                        key={transaction.id}
                        className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"
                        style={{ borderTop: "1px solid #000" }}
                      >
                        {transaction.transaction_detail.map((detail) => (
                          <div className="mt-0 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 bg-slate-300">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                  Transaction No: {transaction.id}
                                </p>

                                <div className="mt-0 md:mt-2 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                  <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img
                                      className="w-full hidden md:block"
                                      src={`http://127.0.0.1:8000/storage/Farms/${detail.product_ordered.farm_belonged}/${detail.product_ordered.product_picture}`}
                                    />
                                  </div>
                                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                        <span>{detail.product_name}</span>
                                      </h3>
                                      <div className="flex justify-start items-start flex-col space-y-2">
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Variety:{" "}
                                          </span>
                                          {detail.variety}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Planted :{" "}
                                          </span>
                                          {detail.planted_date}
                                        </p>
                                        <p className="text-sm leading-none text-gray-800">
                                          <span className="text-gray-300">
                                            Harvested:{" "}
                                          </span>
                                          {detail.harvested_date}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                      <p className="text-base xl:text-lg leading-6">
                                        ₱ {detail.price_per_kilo} /Kl
                                      </p>
                                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                                        {detail.kg_purchased} Kl
                                      </p>
                                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                        ₱{" "}
                                        {detail.price_per_kilo *
                                          detail.kg_purchased}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800">
                                    Summary
                                  </h3>
                                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                      <p className="text-base leading-4 text-gray-800">
                                        Subtotal
                                      </p>
                                      <p className="text-base leading-4 text-gray-600">
                                        ₱{" "}
                                        {detail.price_per_kilo *
                                          detail.kg_purchased}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-semibold leading-4 text-gray-800">
                                      Total
                                    </p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">
                                      ₱{" "}
                                      {detail.price_per_kilo *
                                        detail.kg_purchased}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                                  <h3 className="text-xl font-semibold leading-5 text-gray-800 ">
                                    Order Status :{" "}
                                    <span className="text-sm border-y-orange-400  bg-green-300">
                                      {" "}
                                      <br />
                                      ORDER RECIEVED{" "}
                                    </span>
                                  </h3>
                                  <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                      <div class="w-8 h-8">
                                        <img
                                          class="w-full h-full"
                                          alt="logo"
                                          src="https://i.ibb.co/L8KSdNQ/image-3.png"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-start items-center">
                                        <p className="text-lg leading-6 font-semibold text-green-800">
                                          Date Confirmed
                                          <br />
                                          <span className="font-normal">
                                            {transaction.payed_on}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null //
                )}
              </div>
            ))}
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
}
