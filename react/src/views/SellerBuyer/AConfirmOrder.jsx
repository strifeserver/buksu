import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";

export default function AConfirmOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // This code will run when the page is triggered
    handleConfirm();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleConfirm = () => {
    // If confirmed, send the ID to the backend
    axiosClient.post(`/confirmOrder/${id}`).then((response) => {
      // Handle success or error
      console.log("Confirmation sent to the backend");

      navigate("/buyer-seller/orders"); // Redirect to another page
    }).catch((error) => {
      console.error("Error sending confirmation to the backend:", error);
      // Handle error here
    });
  };

  return (
    <div className="text-center">
      <p className="text-center">Confirming ...</p>
    </div>
  )
}
