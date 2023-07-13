import { useEffect, useState, createRef } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate, useParams  } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function ProductsSupported() {
  const [loading, setLoading] = useState(false);
  let {id} = useParams();
  const [barangay, setBarangay] = useState({
    id: null,
    name: '',
  })

  // if (id) {
  //   useEffect(() => {
  //     setLoading(true)
  //     axiosClient.get(`/barangays/${id}`)
  //       .then(({data}) => {
  //         setLoading(false)
  //         setBarangay(data)
  //       })
  //       .catch(() => {
  //         setLoading(false)
  //       })
  //   }, [])
  // }

  return (
    <div>

    </div>
  )
}
