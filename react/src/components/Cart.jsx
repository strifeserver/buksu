import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Table, Tabs, Button, Modal, Card } from "flowbite-react";
import { IoIosCash } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { MdFiberSmartRecord } from "react-icons/md";
import Swal from 'sweetalert2';
import CartTable from './CartTable';
import SearchBar from './SearchBar';
import DataTable from 'react-data-table-component';

export default function Cart() {
    const { currentUserID, userType } = useStateContext();
    const [openModal, setOpenModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [totalPayment, setTotalPayment] = useState(0);

    const columns = [
        { name: 'Seller Name', selector: 'sellerName', sortable: true },
        { name: 'Farm Name', selector: 'farmName', sortable: true },
        { name: 'Product Name', selector: 'productName', sortable: true },
        { name: 'Type', selector: 'type', sortable: true },
        { name: 'Price', selector: 'price', sortable: true },
        { name: 'Total Amount', selector: 'totalAmount', sortable: true },
        { name: 'Kg', selector: 'kg', sortable: true },
        { name: 'Item Details', selector: 'itemDetails', sortable: true },
        { name: '', selector: 'blankColumn', sortable: true },
    ];

    const columnsCheckout = [
        {
            name: 'Product',
            selector: 'productName',
            sortable: true,
        },
        {
            name: 'Variety',
            selector: 'type',
            sortable: true,
        },
        {
            name: 'Kilograms',
            selector: 'kg',
            sortable: true,
        },
        {
            name: 'Total Price',
            selector: 'totalAmount',
            sortable: true,
        },
        {
            name: 'Price',
            selector: 'price',
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

    const handleDetailsClick = (url) => {
        window.open(url, '_blank');
    };

    const handleRemoveClick = (rowId) => {
        axiosClient
            .delete(`cart/${rowId}`)
            .then(() => {
                getCartData();
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleSelectedRowsChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);

        let totalPayment = 0;
        selectedRows?.map((data) => {
            totalPayment += data.totalAmount;
        })

        setTotalPayment(totalPayment);
    };

    const handleKgChange = (rowId, value) => {
        const formData = {
            kg_: value,
        };

        setTableData((prevData) =>
            prevData.map((item) =>
                item.id === rowId
                    ? {
                        ...item,
                        kg: value,
                        totalAmount: parseFloat(item.price) * parseFloat(value),
                    }
                    : item
            )
        );

        axiosClient
            .put(`cart/${rowId}`, formData)
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const checkOut = () => {
        if (selectedRows.length === 0) {
            Swal.fire({
                title: "Checkbox empty",
                text: "Please check the items you wanna checkout.",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Confirm"
            });
        } else {
            setOpenModal(true);
        }
    };

    const onCheckOut = () => {
        Swal.showLoading();

        let combinedString = selectedRows.map(obj => obj.id).join(',');

        const formData = {
            cart_id: combinedString,
            user_ID: currentUserID
        };

        axiosClient
            .post("/checkout", formData)
            .then(() => {
                Swal.close();
                Swal.fire({
                    title: "Checkout Success!",
                    icon: "success"
                }).then(() => {
                    switch (userType) {
                        case "1": window.location.href = "/buyer-seller/orders";
                            break;
                        case "0": window.location.href = "/buyer/orders";
                            break;
                    }
                });
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                console.log("Response headers:", error.response.headers);
            });


    };

    const handleSearchChange = (value) => {
        setSearchValue(value);

        const apiUrl = '/cart';

        const requestParams = {
            user_id: currentUserID,
            filter: JSON.stringify({
                all: {
                    filter: value,
                },
            }),
        };


        cartAxios(apiUrl, requestParams);
    };

    const getCartData = () => {
        const apiUrl = '/cart';

        const requestParams = {
            user_id: currentUserID,
        };

        cartAxios(apiUrl, requestParams);
    }

    const cartAxios = (apiUrl, requestParams) => {
        let itemDetails = "";

        switch (userType) {
            case "1": itemDetails = '/buyer-seller/order/products/';
                break;
            case "0": itemDetails = '/buyer/order/products/';
                break;
        }

        axiosClient.get(apiUrl, { params: requestParams })
            .then(response => {
                const newData = response.data.data.map((item) => ({
                    sellerName: item.name,
                    id: item.id,
                    farmName: item.farm_name,
                    productName: item.product_name,
                    type: item.product_type,
                    price: item.price,
                    totalAmount: item.price * item.kg_added,
                    kg: item.kg_added,
                    itemDetails: itemDetails + item.product_id
                }));

                setTableData(newData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        getCartData();
    }, []);

    return (
        <>
            <div className="px-48 py-5">
                <div className="bg-gray-100 w-full">
                    <p className="text-center mt-3">Cart</p>
                    <p className="text-xs mt-0 mb-6 text-center italic">
                        Your cart items are shown here
                    </p>
                    <div className="overflow-x-auto">
                        <SearchBar onSearchChange={handleSearchChange} />
                        <CartTable
                            data={tableData}
                            columns={columns}
                            onDetailsClick={handleDetailsClick}
                            onRemoveClick={handleRemoveClick}
                            onSelectedRowsChange={handleSelectedRowsChange}
                            onKgChange={handleKgChange}
                        />
                    </div>

                    <button onClick={checkOut} className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
                        Checkout
                    </button>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Checkout Summary</Modal.Header>
                <Modal.Body>
                    <div className="overflow-x-auto">
                        <DataTable
                            columns={columnsCheckout}
                            data={selectedRows}
                            pagination
                            customStyles={customStyles}
                        />
                        <Tabs.Group
                            aria-label="Tabs with underline"
                            style="underline"
                            className="items-center mt-1"
                        >
                            <Tabs.Item active icon={IoIosCash} title="Cash on Delivery">

                            </Tabs.Item>
                            <Tabs.Item icon={CiGlobe} title="Gcash">

                            </Tabs.Item>
                            <Tabs.Item icon={MdFiberSmartRecord} title="Paymaya">

                            </Tabs.Item>
                            <Tabs.Item icon={CiCreditCard1} title="Credit/Debit Card">

                            </Tabs.Item>
                        </Tabs.Group>
                        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Total Payment: {totalPayment}
                            </h5>
                        </Card>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onCheckOut()}>Checkout</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

