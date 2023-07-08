import { useEffect, useState, createRef } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate, useParams  } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

import {
  Table,
  Button,
  Pagination,
  Spinner,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";



export default function BarangaySupported() {
  const [loading, setLoading] = useState(false);
  let {id} = useParams();
  const [barangay, setBarangay] = useState({
    id: null,
    name: '',
  })

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/barangays/${id}`)
        .then(({data}) => {
          setLoading(false)
          setBarangay(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/barangays/${barangay.id}`, barangay)
        .then(() => {
          setNotification('Barangay was successfully updated')
          navigate('/admin/supported/barangay')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <div class="pl-12 pr-12 pt-6">
      <div class="grid grid-cols-2 gap-4 mt-4 mb-6">
        <div>
          <h1>Edit :</h1>
        </div>

      </div>
      <div>
        <div className="card animated fadeInDown">





        </div>
      </div>


    </div>
  );
}
