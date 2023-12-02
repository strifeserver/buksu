import { useState, useEffect, Fragment } from "react";
import axiosClient from "../../axios-client.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faMoneyBillTransfer, faUsersViewfinder, faPersonCircleQuestion, faWeightScale, faMoneyBills } from '@fortawesome/free-solid-svg-icons'
import { useStateContext } from "../../context/ContextProvider";
import SellerDataTable from '../../components/SellerDataTable.jsx';
import EditForm from '../../components/EditForm.jsx';
import SearchBar from '../../components/SearchBar';
import Swal from 'sweetalert2';

export default function ABuyerSellerDashboard() {
  const [farmCount, setFarmCount] = useState([]);
  const [pendingOrderCount, setPendingOrderCount] = useState([]);
  const [range, setRange] = useState([]);
  const [totalSold, setTotalSold] = useState([]);
  const { currentUserID } = useStateContext();
  const [editData, setEditDate] = useState([]);
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [brocolli, setBrocolli] = useState([]);
  const [cabbage, setCabbage] = useState([]);
  const [carrot, setCarrot] = useState([]);
  const [tomato, setTomato] = useState([]);
  const columns = [
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'Farm Name', selector: 'farm_name', sortable: true },
    { name: 'Product Name', selector: 'product_name', sortable: true },
    { name: 'Variety', selector: 'variety', sortable: true },
    { name: 'Price', selector: 'price', sortable: true },
    { name: 'Planted Date', selector: 'planted_date', sortable: true },
    { name: 'Harvested Date', selector: 'harvested_date', sortable: true },
    { name: 'Harvested kg', selector: 'actual_harvested_in_kg', sortable: true },
    { name: 'Approval', selector: 'is_approved', sortable: true },
    {
      name: '',
      button: true,
      cell: (row) => <button onClick={() => handleEdit(row.id)}>Edit</button>,
    },
  ];
  const [formData, setFormData] = useState({
    product_name: '',
    product_type: '',
    variety: '',
    planted_date: '',
    prospect_harvest_in_kg: '',
    prospect_harvest_date: '',
    actual_harvested_in_kg: '',
    harvested_date: '',
    product_location: '',
    price: '',
  });
  const payload = {
    user_ID: currentUserID,
  };

  useEffect(() => {

  }, []);

  const handleSearchChange = (value) => {
    setSearchValue(value);

    const apiUrl = '/product_management';
    const requestParams = {
      filter: JSON.stringify({
        all: {
          filter: value,
        }
      }),
      special_filter: JSON.stringify({
        product_owner: { filter: currentUserID }
      }),
    };

    axiosProduct(apiUrl, requestParams);
  };

  const handleEdit = (id) => {
    const targetObject = data.find(item => item.id === id);
    setEditDate(targetObject);

    setFormData({
      product_name: targetObject.product_name,
      product_type: targetObject.product_type,
      variety: targetObject.variety,
      planted_date: targetObject.planted_date,
      prospect_harvest_in_kg: targetObject.prospect_harvest_in_kg,
      prospect_harvest_date: targetObject.prospect_harvest_date,
      actual_harvested_in_kg: targetObject.actual_harvested_in_kg,
      harvested_date: targetObject.harvested_date,
      product_location: targetObject.product_location,
      price: targetObject.price,
    });
    setEditId(id);
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.showLoading();
    const apiUrl = `/product_management/${editId}`;
    console.log(apiUrl);
    axiosClient.put(apiUrl, formData)
      .then(() => {
        Swal.close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
        getTableData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const getTableData = () => {
    const apiUrl = '/product_management';

    const requestParams = {
      special_filter: JSON.stringify({
        product_owner: { filter: currentUserID }
      }),
    };

    Swal.showLoading();
    axiosProduct(apiUrl, requestParams);
    Swal.close();
  }

  const axiosProduct = (apiUrl, requestParams) => {
    axiosClient.get(apiUrl, { params: requestParams })
      .then(response => {

        const newData = response.data.data.map((item) => ({
          id: item.id,
          farm_name: item.farm.farm_name,
          product_name: item.product_name,
          variety: item.variety,
          price: item.price,
          planted_date: item.planted_date,
          harvested_date: item.harvested_date,
          is_approved: item.is_approved,
          actual_harvested_in_kg: item.actual_harvested_in_kg,
        }));

        setProductData(newData);
        setData(response.data.data);

        console.log(response.data.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    axiosClient
      .post('/sellerDashboard', payload)
      .then(response => {
        setFarmCount(response.data.farmcount),
          setPendingOrderCount(response.data.pendingOrderCount),
          setTotalSold(response.data.totalSold)
        setRange(response.data.priceRange)
          ;
      })
      .catch(error => {
        console.error(error);
      });

    axiosClient.get("/getPriceRangeSpecific")
      .then(({ data }) => {
        setBrocolli(data.broccoli);
        setCabbage(data.cabbage);
        setCarrot(data.carrot);
        setTomato(data.tomato);
      })
      .catch((error) => {
        console.error(error);
      });

    getTableData();
  }, []);

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

              <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-green-600"> <FontAwesomeIcon icon={faUsers} size="lg" inverse /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">Total Farms</h2>
                    <p class="font-bold text-3xl">{farmCount}<span class="text-green-500"><i class="fas fa-caret-up"></i></span></p>
                  </div>
                </div>
              </div>

            </div>

            <div class="w-full md:w-1/2 xl:w-1/3 p-6">

              <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-pink-600"><FontAwesomeIcon icon={faUsersViewfinder} size='lg' inverse /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">Total Orders</h2>
                    <p class="font-bold text-3xl">{pendingOrderCount} <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span></p>
                  </div>
                </div>
              </div>

            </div>

            <div class="w-full md:w-1/2 xl:w-1/3 p-6">

              <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-yellow-600"><FontAwesomeIcon icon={faPersonCircleQuestion} size='lg' inverse /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">Total Sold</h2>
                    <p class="font-bold text-3xl">{totalSold}<span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></p>
                  </div>
                </div>
              </div>

            </div>





          </div>

          <div className="2xl:container 2xl:mx-auto md:py-12 py-9">
            <div className=" bg-gray-50 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-12 gap-14 lg:px-20 lg:py-12 py-10 md:px-12 px-4">
              {/* customer Grid Card */}

              <div>
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M0 192c0-35.3 28.7-64 64-64h1.6C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64h1.6c35.3 0 64 28.7 64 64 0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256h457.2c15.1 0 27.4 12.3 27.4 27.4 0 70.5-44.4 130.7-106.7 154.1l-1.8 14.5c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z" />
                </svg>
                <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
                  Brocolli
                </h3>
                <p className=" text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
                  Max. Price : Php <span className="font-bold">{brocolli}.00</span>
                </p>
              </div>
              {/* Delivery grid Card */}
              <div>
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7 4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74-3.2-4-8.1-6-13.2-6s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L125.5 212v.1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l60.4 60.3 100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z" />
                </svg>
                <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
                  Carrots
                </h3>
                <p className=" text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
                  Max. Price : Php <span className="font-bold">{carrot}.00</span>
                </p>
              </div>

              {/* Recycle Grid Card */}

              <div>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="3em"
                  width="3em"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M2 9a10 10 0 1020 0M12 19A10 10 0 0122 9M2 9a10 10 0 0110 10M12 4a9.7 9.7 0 012.99 7.5M9.01 11.5A9.7 9.7 0 0112 4" />
                </svg>
                <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
                  Cabbages
                </h3>
                <p className=" text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
                  Max. Price : Php <span className="font-bold">{cabbage}.00</span>
                </p>
              </div>

              {/* Secure Payment Card */}

              <div>
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M288 120c0-30.9 25.1-56 56-56s56 25.1 56 56v13c-29.3 10-48 34.5-48 70.1 0 27.9 25.3 74.8 66 111.6 3.8 3.5 8.9 5.3 14 5.3s10.2-1.8 14-5.3c40.7-36.8 66-83.7 66-111.6 0-35.6-18.7-60.2-48-70.1v-13C464 53.7 410.3 0 344 0S224 53.7 224 120v21.8c-16.7-8.8-35.8-13.8-56-13.8-66.3 0-120 53.7-120 120v13c-29.3 10-48 34.5-48 70.1 0 27.9 25.3 74.8 66 111.6 3.8 3.5 8.9 5.3 14 5.3s10.2-1.8 14-5.3c40.7-36.8 66-83.7 66-111.6 0-35.6-18.7-60.2-48-70.1v-13c0-30.9 25.1-56 56-56s56 25.1 56 56v232c0 17.7 14.3 32 32 32s32-14.3 32-32V120z" />
                </svg>
                <h3 className=" text-xl leading-5 font-semibold text-gray-800 lg:mt-10 mt-8 ">
                  Tomato
                </h3>
                <p className=" text-base leading-6 font-normal text-gray-600 mt-4 lg:w-full md:w-9/12 w-full">
                  Max. Price : Php <span className="font-bold">{tomato}.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        editMode ?
          <EditForm formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setEditMode={setEditMode} />
          :
          <Fragment>
            <SearchBar onSearchChange={handleSearchChange} />
            <hr className=" w-full bg-gray-200 mt-1" />
            <SellerDataTable data={productData} columns={columns} handleEdit={handleEdit} />
          </Fragment>

      }
    </div>
  )
}
