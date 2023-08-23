import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

export default function OrdersLists() {
  const { currentUserID } = useStateContext();
  const payload = {
    user_ID: currentUserID,
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axiosClient
      .post("getPendingOrders", payload)
      .then((response) => {
        setData(response.data.farmsOwnedByUser);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-slate-100">

      {data.map((farm) => (
        <React.Fragment key={farm.farm.id}>
          {farm.transactions.map((transaction) => (
            <div key={transaction.transaction.id}>
              <div className="py-7 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto ">
                <div className="mt-0 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0 border">
                  <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                      <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                        {farm.farm.farm_name} : {transaction.transaction.id}
                      </p>
                      {/* ORDERLISTS */}
                      {transaction.transaction_details.map((detail) => (
                        <div
                          key={detail.id}
                          className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                        >
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full hidden md:block"
                              src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                              alt="dress"
                            />
                            <img
                              className="w-full md:hidden"
                              src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                              alt="dress"
                            />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                {detail.product_name}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-300">
                                    Variety:{" "}
                                  </span>{" "}
                                  {detail.product_name}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base xl:text-lg leading-6">
                                ₱
                                {/* <span className="text-red-300 line-through">
                                  {" "}
                                  $45.00
                                </span> */}
                              </p>
                              <p className="text-base xl:text-lg leading-6 text-gray-800">
                                Kg: {detail.kg_purchased}
                              </p>
                              <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                ₱ {detail.total_price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
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
                              {transaction.transaction.price_payed}
                            </p>
                          </div>
                          {/* <div className="flex justify-between items-center w-full">
                            <p className="text-base leading-4 text-gray-800">
                              Discount{" "}
                              <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                                STUDENT
                              </span>
                            </p>
                            <p className="text-base leading-4 text-gray-600">
                              -$28.00 (50%)
                            </p>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <p className="text-base leading-4 text-gray-800">
                              Shipping
                            </p>
                            <p className="text-base leading-4 text-gray-600">
                              $8.00
                            </p>
                          </div> */}
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-xl font-semibold leading-4 text-gray-800">
                            Total
                          </p>
                          <p className="text-xl font-semibold leading-4 text-gray-600">
                            ₱ {transaction.transaction.price_payed}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">
                          Transaction Date :
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
                              <p className="text-lg leading-6 font-semibold text-gray-800">
                                Trnx
                                <br />
                                <span className="font-normal">
                                  {
                                    transaction.transaction
                                      .agreed_date_of_exchange
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                          <p className="text-lg font-semibold leading-6 text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>
                          </p>
                        </div>
                        <div className="w-full flex justify-center items-center">
                          <button
                            disabled
                            className="disabled  bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-ful text-base font-medium leading-4 text-white"
                          >
                            Fulfilled Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <h3 className="text-xl font-semibold leading-5 text-gray-800">
                      Customer
                    </h3>
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                      <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                          <img
                            src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                            alt="avatar"
                          />
                          <div className=" flex justify-start items-start flex-col space-y-2">
                            <p className="text-base font-semibold leading-4 text-left text-gray-800">
                              {transaction.buyer_user.name}
                            </p>
                            <p className="text-sm leading-5 text-gray-600">
                              {transaction.buyer_user.birthday}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                            />
                          </svg>

                          <p className="cursor-pointer text-sm leading-5 text-gray-800">
                            {transaction.buyer_user.mobile_number}
                          </p>
                        </div>
                        <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                              stroke="#1F2937"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 7L12 13L21 7"
                              stroke="#1F2937"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="cursor-pointer text-sm leading-5 text-gray-800">
                            {transaction.buyer_user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                          <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                              Address
                            </p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {transaction.buyer_user.address}
                            </p>
                          </div>
                          <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                              User Info
                            </p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {" "}
                              {transaction.buyer_user.is_verified === 1 ? (
                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  verified
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="w-5 h-5 inline-block"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </p>
                              ) : (
                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      class="w-5 h-5"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  Not verified
                                </p>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full justify-center items-center md:justify-start md:items-start mt-2">
                          <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                            {" "}
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      <hr />

      {/* <h1>THE BASE FORM</h1> */}
      {/* <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Farm Transactions</h1>
        <table className="table-auto border w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Farm Name</th>
              <th className="border px-4 py-2">Buyer Name</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Ordered On</th>
              <th className="border px-4 py-2">Product Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((farm) => (
              <React.Fragment key={farm.farm.id}>
                {farm.transactions.map((transaction) => (
                  <tr key={transaction.transaction.id}>
                    <td className="border px-4 py-2">{farm.farm.farm_name}</td>
                    <td className="border px-4 py-2">
                      {transaction.buyer_user.name}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.buyer_user.mobile_number}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.transaction.id}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.transaction.ordered_on}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.transaction_details.map((detail) => (
                        <div key={detail.id}>{detail.product_name}</div>
                      ))}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
