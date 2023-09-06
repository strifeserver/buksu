import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Modal } from "flowbite-react";
export default function PendingOrders() {
  const { currentUserID } = useStateContext();
  const payload = {
    user_ID: currentUserID,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirm, setModalConfirm] = useState(false);
  const [isModalDetails, setModalDetails] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModalConfirm = () => {
    setModalConfirm(true);
  };
  const openModalDetails = () => {
    setModalDetails(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalConfirm = () => {
    setModalConfirm(false);
  };
  const closeModalDetails = () => {
    setModalDetails(false);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axiosClient
      .post("getPendingOrders", payload)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  if (data.userPendingOrders === undefined) {
    return <div>Loading ...</div>;
  }

  const handleTransactionChange = (event) => {
    const selectedTxnId = event.target.value;
    // Do something with the selectedTxnId, store it in state, etc.
  };
  const submitConfirm = (event) => {
    event.preventDefault();
    // Perform actions based on the selected transaction(s)
    // You can access the selected transaction IDs from your state.
  };

  return (
    <>
      {data.userPendingOrders.map((order) => (
        <div className="bg-green-300">
          {order.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto"
            >
              {transaction.transaction_detail.map((detail) => (
                <div className="mt-1 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                  <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                      <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                        Transaction No : {transaction.id}
                      </p>

                      <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            className="w-full hidden md:block"
                            src="https://placehold.co/600x400.png"
                          />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                              <span>{detail.product_name}</span>
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-300">Variety: </span>
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
                              ₱ {detail.price_per_kilo * detail.kg_purchased}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">
                          Summary
                        </h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                          <div className="flex justify-between  w-full">
                            <p className="text-base leading-4 text-gray-800">
                              Subtotal
                            </p>
                            <p className="text-base leading-4 text-gray-600">
                              {" "}
                              ₱ {detail.price_per_kilo * detail.kg_purchased}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base font-semibold leading-4 text-gray-800">
                            Total
                          </p>
                          <p className="text-base font-semibold leading-4 text-gray-600">
                            ₱ {detail.price_per_kilo * detail.kg_purchased}
                          </p>
                        </div>
                      </div>

                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                          <h3 className="text-xl font-semibold leading-5 text-gray-800">
                            Order Status : <span className="text-sm border-y-orange-400"> PENDING </span>
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
                                 Date to Recieve
                                  <br />
                                  <span className="font-normal">
                                    {transaction.seller_prospect_date_todeliver}
                                  </span>
                                </p>
                              </div>

                            </div>
                            <p className="text-lg font-semibold leading-6 text-gray-800">
                              Ordered : {transaction.ordered_on}
                            </p>
                          </div>
                        </div>
                    </div>
                  </div>
                 </div>
              ))}
            </div>
          ))}
        </div>
      ))}

    </>
  );
}
