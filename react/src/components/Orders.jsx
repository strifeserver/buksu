import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

export default function Orders() {
  const { currentUserID, userType } = useStateContext();
  const [pendingData, setPendingData] = useState([]);
  const [deliveredData, setDeliveredData] = useState([]);
  const [successData, setSuccessData] = useState([]);
  const payload = {
    user_ID: currentUserID,
  };
  const pendingColumns = [
    {
      name: '#',
      selector: 'transactionNumber',
      sortable: true,
    },
    {
      name: 'Product',
      selector: 'product',
      sortable: true,
    },
    {
      name: 'Variety',
      selector: 'variety',
      sortable: true,
    },
    {
      name: 'Planted',
      selector: 'planted',
      sortable: true,
    },
    {
      name: 'Harvested',
      selector: 'harvested',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
    {
      name: 'Kilograms',
      selector: 'kilograms',
      sortable: true,
    },
    {
      name: 'Total Price',
      selector: 'totalPrice',
      sortable: true,
    },
    {
      name: 'Order Status',
      selector: 'orderStatus',
      sortable: true,
    },
    {
      name: 'Date Received',
      selector: 'dateToReceive',
      sortable: true,
    },
    {
      name: '',
      selector: 'blank',
      sortable: true,
      cell: (row) => (
        <button style={{ backgroundColor: 'red', color: 'white', padding: '8px' }} onClick={() => handleCancelOrder(row)}>
          Cancel Order
        </button>
      ),
    },
  ];
  const sdColumns = [
    {
      name: '#',
      selector: 'transactionNumber',
      sortable: true,
    },
    {
      name: 'Product',
      selector: 'product',
      sortable: true,
    },
    {
      name: 'Variety',
      selector: 'variety',
      sortable: true,
    },
    {
      name: 'Planted',
      selector: 'planted',
      sortable: true,
    },
    {
      name: 'Harvested',
      selector: 'harvested',
      sortable: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
    },
    {
      name: 'Kilograms',
      selector: 'kilograms',
      sortable: true,
    },
    {
      name: 'Total Price',
      selector: 'totalPrice',
      sortable: true,
    },
    {
      name: 'Date Received',
      selector: 'dateToReceive',
      sortable: true,
    },
    {
      name: 'Paid Date',
      selector: 'paidDate',
      sortable: true,
    },
    {
      name: 'Amount Paid',
      selector: 'amountPaid',
      sortable: true,
    },
    {
      name: 'Order Status',
      selector: 'orderStatus',
      sortable: true,
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#bdf1da',
        border: '1px solid black',
      },
    },
    cells: {
      style: {
        border: '1px solid black',
      },
    },
  };

  useEffect(() => {
    Swal.showLoading();
    axiosClient
      .get("getOrders", { params: payload })
      .then((response) => {

        let id = 0;
        let dateToReceive = "";
        let paidDate = "";
        let amountPaid = "";
        let newPendingData = [];
        let newDeliveredData = [];
        let newSuccessData = [];

        response.data.userPendingOrders.map((order) => {
          order?.transactions?.map((transaction) => {
            id = transaction.id;
            dateToReceive = transaction.date_delivered;
            paidDate = transaction.payed_on;
            amountPaid = transaction.price_payed;

            if (transaction?.date_delivered === null) {
              transaction?.transaction_detail?.map((detail) => {
                newPendingData = [...newPendingData, {
                  id: detail.id,
                  transactionNumber: detail.id,
                  product: detail.product_name,
                  variety: detail.variety,
                  planted: detail.planted_date,
                  harvested: detail.harvested_date,
                  price: detail.price_per_kilo,
                  kilograms: detail.kg_purchased,
                  totalPrice: detail.price_per_kilo * detail.kg_purchased,
                  orderStatus: 'Pending',
                  dateToReceive: dateToReceive,
                }];
              });
            } else if (transaction.date_delivered != null && transaction.payed_on === null) {
              transaction?.transaction_detail?.map((detail) => {
                newDeliveredData = [...newDeliveredData, {
                  id: detail.id,
                  transactionNumber: detail.id,
                  product: detail.product_name,
                  variety: detail.variety,
                  planted: detail.planted_date,
                  harvested: detail.harvested_date,
                  price: detail.price_per_kilo,
                  paidDate: paidDate,
                  amountPaid: amountPaid,
                  kilograms: detail.kg_purchased,
                  totalPrice: detail.price_per_kilo * detail.kg_purchased,
                  orderStatus: 'Delivered',
                  dateToReceive: dateToReceive,
                }];
              });
            } else if (transaction.date_delivered != null && transaction.payed_on != null) {
              transaction?.transaction_detail?.map((detail) => {
                newSuccessData = [...newSuccessData, {
                  id: detail.id,
                  transactionNumber: detail.id,
                  product: detail.product_name,
                  variety: detail.variety,
                  planted: detail.planted_date,
                  harvested: detail.harvested_date,
                  price: detail.price_per_kilo,
                  paidDate: paidDate,
                  amountPaid: amountPaid,
                  kilograms: detail.kg_purchased,
                  totalPrice: detail.price_per_kilo * detail.kg_purchased,
                  orderStatus: 'Success',
                  dateToReceive: dateToReceive,
                }];
              });
            }
          });
        });

        setPendingData(newPendingData);
        setDeliveredData(newDeliveredData);
        setSuccessData(newSuccessData);

        Swal.close();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCancelOrder = (transactionId) => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Order Cancelled!",
          icon: "success"
        });

        switch (userType) {
          case "1": window.location.href = `/buyer-seller/order/cancel/${transactionId.id}`;
            break;
          case "0": window.location.href = `/buyer/order/cancel/${transactionId.id}`;
            break;
        }
      }
    });
  };

  return (
    <>
      <div className="px-48 py-5">
        <Tabs.Group
          aria-label="Tabs with underline"
          style="underline"
        >
          <Tabs.Item active icon={HiUserCircle} title="Pending Orders">
            <div className="bg-gray-100 w-full">
              <p className="text-center mt-3">Pending Orders</p>
              <p className="text-xs mt-0 mb-6 text-center italic">
                Orders that are to be delivered are shown here:
              </p>
              {pendingData.length != 0 ?
                <DataTable
                  columns={pendingColumns}
                  data={pendingData}
                  pagination
                  customStyles={customStyles}
                />
                :
                <></>
              }
            </div>
          </Tabs.Item>
          <Tabs.Item active icon={HiUserCircle} title="Delivered Orders">
            <div className="bg-gray-100 w-full">
              <p className="text-center mt-3">Delivered Orders</p>
              <p className="text-xs mt-0 mb-6 text-center italic">
                Delivered Orders that requires your confirmation:
              </p>
              {deliveredData.length != 0 ?
                <DataTable
                  columns={sdColumns}
                  data={deliveredData}
                  pagination
                  customStyles={customStyles}
                />
                :
                <></>
              }
            </div>
          </Tabs.Item>

          <Tabs.Item active icon={HiUserCircle} title="Successful Orders">
            <div className="bg-gray-100 w-full">
              <p className="text-center mt-3">Fulfilled Orders</p>
              <p className="text-xs mt-0 mb-6 text-center italic">
                All Delivered and Confirmed Orders Appear here:
              </p>
              {successData.length != 0 ?
                <DataTable
                  columns={sdColumns}
                  data={successData}
                  pagination
                  customStyles={customStyles}
                />
                :
                <></>
              }
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </>
  );
}
