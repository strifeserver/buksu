import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";

export default function GenerateReport() {
  // Get today's date in the format yyyy-MM-dd
  const today = new Date().toISOString().split("T")[0];

  const { currentUserID } = useStateContext();

  const payload = {
    user_ID: currentUserID,
  };

  var counter = 1;
  //ADDING PRODUCTS
  const [formData, setFormData] = useState({
    product_type: "",
    starting_date: "",
    end_date: "",
    user_ID: currentUserID,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const addFarmForm = (e) => {
    e.preventDefault();

    axiosClient
      .post("/generateReport", formData)
      .then((response) => {
        setFormData({
          product_type: "",
          starting_date: "",
          end_date: "",
        });
      })
      .catch((error) => {
        showInfoAlert();
        console.error(error);
      });
  };

  return (
    <div className="mt-3 mx-6">
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        className="items-center"
      >
        <Tabs.Item active icon={HiUserCircle} title="Report">
          <div className="m-12 outline outline-2  outline-offset-2">
            <div className="p-4 mb-5 bg-gray-200 dark:bg-gray-900 ">
              <p className="text-center text-lg mt-2 p-2">Report Generation</p>
              <form onSubmit={addFarmForm}>
                {/* START */}
                <div
                  className="bg-gray-200 dark:bg-gray-900 flex items-center justify-center"
                  style={{ fontFamily: '"Lato", sans-serif' }}
                >
                  <div className="flex md:flex-row flex-col items-center py-8 px-4">
                    {/* Code block starts */}
                    <div className="flex flex-col md:mr-16">
                      <label
                        htmlFor="farm_name"
                        className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Product Type
                      </label>
                      <div className="relative">
                        <div className="absolute text-gray-600 dark:text-gray-400 flex items-center pl-4 h-full cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                            />
                          </svg>
                        </div>
                        <select
                          id="product_type"
                          name="product_type"
                          value={formData.product_type}
                          onChange={handleChange}
                          required
                          className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-12 text-sm border-gray-300 rounded border shadow"
                        >
                          <option value="-">Please Select --</option>

                          <option value="Brocollis">Brocollis</option>
                          <option value="Carrots">Carrots</option>
                          <option value="Cabbages">Cabbages</option>
                          <option value="Tomatoes">Tomatoes</option>
                        </select>
                      </div>
                    </div>
                    {/* Code block ends */}
                    {/* Code block starts */}
                    <div className="flex flex-col md:mr-16 md:py-0 py-4">
                      <label
                        htmlFor="product_type"
                        className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Starting Date To Print
                      </label>
                      <div className="relative">
                        <div className="absolute text-gray-600 dark:text-gray-400 flex items-center px-4 border-r dark:border-gray-700 h-full cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                            />
                          </svg>
                        </div>

                        <input
                          type="date"
                          id="starting_date"
                          name="starting_date"
                          value={formData.starting_date}
                          onChange={handleChange}
                          required
                          max={today}
                          className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-12 text-sm border-gray-300 rounded border shadow"
                        />
                      </div>
                    </div>
                    {/* Code block ends */}
                    {/* Code block starts */}
                    <div className="flex flex-col md:mr-16 md:py-0 py-4">
                      <label
                        htmlFor="farm_belonged"
                        className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        End Date to Print
                      </label>
                      <div className="relative">
                        <div className="absolute text-gray-600 dark:text-gray-400 flex items-center px-4 border-r dark:border-gray-700 h-full cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                            />
                          </svg>
                        </div>
                        <input
                          type="date"
                          id="end_date"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          required
                          max={today}
                          className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-12 text-sm border-gray-300 rounded border shadow"
                        />
                      </div>
                    </div>

                    {/* Code block ends */}
                  </div>
                </div>

                {/* SECOND PART */}

                <div
                  className="bg-gray-200 dark:bg-gray-900 flex items-center justify-center"
                  style={{ fontFamily: '"Lato", sans-serif' }}
                >
                  <div className="flex md:flex-row flex-col items-center pt-1 pb-8 px-4">
                    {/* Code block starts */}
                    <div className="flex flex-col md:mr-16 md:py-0 py-4">
                      <div className="relative">
                        <button
                          type="submit"
                          // onClick={addP roductForm}
                          className="mx-2 my-2 bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-6 py-2 text-md w-full block"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                    {/* Code block ends */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
