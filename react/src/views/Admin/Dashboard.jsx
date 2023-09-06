import React, { useEffect, useState, } from 'react'
import axiosClient from "../../axios-client.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faMoneyBillTransfer, faUsersViewfinder, faPersonCircleQuestion, faWeightScale, faMoneyBills } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
//  const userAll = 11;
  const [userAll, setUserCount] = useState([]);
  const [pendingUser, setPendingUser] = useState([]);
  const [activeUser, setactiveUser] = useState([]);
  const [transactionCount, settransactionCount] = useState([]);

  useEffect(() => {
    axiosClient
      .get('/usercount')
      .then(response => {
        setUserCount(response.data.userAll),
        setPendingUser(response.data.pendingUser),
        setactiveUser(response.data.activeUser),
        settransactionCount(response.data.transactionCount)

        ;
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const element = <FontAwesomeIcon icon={[
      faMoneyBillTransfer,
      faUsers,
      faUsersViewfinder,
      faPersonCircleQuestion,
      faWeightScale,
      faMoneyBills,

    ]} />

  return (
    <div>
        <section>
            <div id="main" class="main-content flex-1 bg-gray-100 mt-11 md:mt-2 pb-24 md:pb-5">

                <div class="bg-gray-800 pt-3">
                    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 class="font-bold pl-2">Analytics </h1>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <a href="/admin/users/all">
                        <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-green-600"> <FontAwesomeIcon icon={faUsers} size="lg" inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Total Users</h2>
                                   <p class="font-bold text-3xl">{userAll}<span class="text-green-500"><i class="fas fa-caret-up"></i></span></p>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>

                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">

                        <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-pink-600"><FontAwesomeIcon icon={faUsersViewfinder} size='lg' inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Active Users</h2>
                                    <p class="font-bold text-3xl">{activeUser} <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <a href="/admin/users/pending">
                        <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-yellow-600"><FontAwesomeIcon icon={faPersonCircleQuestion} size='lg' inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Unvalidated Users</h2>
                                    <p class="font-bold text-3xl">{pendingUser}<span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></p>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>

                    {/* NEW TILES */}

                    {/* <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <a href="/admin/users/all">
                        <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-green-600"> <FontAwesomeIcon icon={faUsers} size="lg" inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Number of Farms</h2>
                                   <p class="font-bold text-3xl">{userAll}<span class="text-green-500"><i class="fas fa-caret-up"></i></span></p>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>

                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">

                        <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-pink-600"><FontAwesomeIcon icon={faUsersViewfinder} size='lg' inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Pending farms</h2>
                                    <p class="font-bold text-3xl">{activeUser} <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <a href="/admin/users/pending">
                        <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-yellow-600"><FontAwesomeIcon icon={faPersonCircleQuestion} size='lg' inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Unvalidated Users</h2>
                                    <p class="font-bold text-3xl">{pendingUser}<span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></p>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div> */}

                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                    <a href="/admin/products/pending">
                        <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-blue-600"><FontAwesomeIcon icon={faMoneyBillTransfer} size='lg' inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Pending Products</h2>
                                    <p class="font-bold text-3xl"> ...</p>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>

                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                        {/* <!--Metric Card--> */}
                        <div class="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-indigo-600"><FontAwesomeIcon icon={faWeightScale} size="lg" inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Kilogram's Sold</h2>
                                    <p class="font-bold text-3xl"> ... </p>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                    </div>
                    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
                        {/* <!--Metric Card--> */}
                        <div class="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded-full p-5 bg-red-600"><FontAwesomeIcon icon={faMoneyBills} size="lg" inverse /></div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h2 class="font-bold uppercase text-gray-600">Monthly Transactions</h2>
                                    <p class="font-bold text-3xl">{transactionCount} <span class="text-red-500"><i class="fas fa-caret-up"></i></span></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
