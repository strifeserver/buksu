import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Tabs } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import SearchBar from './SearchBar';
import DropdownFilter from './DropdownFilter';
import { MdDashboard } from 'react-icons/md';
import Swal from 'sweetalert2';

export default function Products() {
  const { userType } = useStateContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const productTypes = ["All Products", "Brocollis", "Cabbages", "Carrots", "Tomatoes"];

  const handleSearchChange = (value) => {
    setSearchValue(value);

    const apiUrl = '/product_management';

    const requestParams = {
      filter: JSON.stringify({
        all: {
          filter: value,
        },
        is_approved: {
          filter: 1
        }
      }),

    };

    axiosProduct(apiUrl, requestParams);
  };

  const handleOptionSelect = (selectedValue) => {
    const apiUrl = '/product_management';

    const requestParams = {
      filter: JSON.stringify({
        all: {
          filter: searchValue,
        },
        is_approved: {
          filter: 1,
        },
      }),
      sort: JSON.stringify({
        price: {
          sort_by: selectedValue,
        },
      }),
    };

    axiosProduct(apiUrl, requestParams);
  };

  const axiosProduct = (apiUrl, requestParams) => {
    
    axiosClient.get(apiUrl, { params: requestParams })
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    Swal.showLoading();
    axiosClient.get("/products")
      .then((response) => {
        const data = response.data.products;
        setProducts(data);
        Swal.close();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 4000); //

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const productView = (product, type) => {
    let view = (<div className="relative" key={product.id + type}>
      <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50 "></div>
      <div className="relative group">
        <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
        <img
          className="w-96 h-96"
          src={`http://127.0.0.1:8000/storage/Farms/${product.farm_belonged}/${product.product_picture}`}
          alt="Product Pic"
        />
      </div>
      <p className="font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
        {product.product_name.toUpperCase()}
      </p>
      <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">
        ₱ {product.price}<span className="text-sm">/Kl</span>
      </p>
      <div className="flex flex-row justify-between mt-4">
        <p className="font-medium text-base leading-4 text-gray-600"></p>
        <div className="flex">
          <p className="text-sm">Kilos Available &nbsp;</p>
          <br />
          <input
            id={`counter_${product.id}`}
            type="number"
            name={`kg_${product.id}`}
            value={product.prospect_harvest_in_kg - product.actual_sold_kg}
            disabled
            aria-label="input"
            className="border border-gray-300 h-full text-center w-20 pb-1 font-bold"
          />
        </div>
      </div>
      <p>{product.farm.farm_name}&nbsp;<span className="bg-green-300 rounded-lg">{product.farm.farm_location.toUpperCase()}</span></p>
      <p><span className="font-bold">Seller : &nbsp; </span>{product.farm.user.name}</p>
      <a href={`${userType == 1 ? `/buyer-seller/order/products/${product.id}` : `/buyer/order/products/${product.id}`} `}>
        <button className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2">
          Details
        </button>
      </a>
    </div>)

    return (product.product_type === type ?
      view
      :
      "All Products" === type ?
        view
        :
        <></>
    )
  }

  return (
    <>
      <div className=" 2xl:container 2xl:mx-auto">
        <div className=" py-6 lg:px-20 md:px-6 px-4">
          <SearchBar onSearchChange={handleSearchChange} /> <DropdownFilter onSelectOption={handleOptionSelect} />

          <hr className=" w-full bg-gray-200 mt-1" />
          <Tabs.Group
            aria-label="Tabs with underline"
            style="underline"
            className="items-center"
          >
            {
              productTypes.map((type) => {
                return (
                  <Tabs.Item icon={type === "All Products" ? HiAdjustments : MdDashboard} title={type} key={type}>
                    <hr className=" w-full bg-gray-200 mt-1" />
                    {!loading && (
                      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                        {products?.map((product) =>
                        (
                          productView(product, type)
                        ))}
                      </div>
                    )}
                  </Tabs.Item>
                )
              })
            }
          </Tabs.Group>
        </div>
      </div>
    </>
  );
}