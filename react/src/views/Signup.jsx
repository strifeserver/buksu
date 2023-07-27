import React, { useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import Modal from "../components/Modal.jsx";

export default function Signup() {
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    mobile_number: "",
    address: "",
    user_type: "", // Add an initial value here
    id_pic: null, // Change to null to handle file uploads
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(null); // Reset errors before form submission

    const userData = new FormData();
    for (const key in formData) {
      userData.append(key, formData[key]);
    }

    axiosClient
      .post("/signup", userData)
      .then((response) => {
        setIsSubmitting(false);
        if (response && response.status === 200) {
          const successMessage = response.data.success;
          if (successMessage) {
            setIsModalOpen(true);
            setModalMessage(successMessage);
          }
        }

        // Optionally, you can redirect to another page here
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        setIsSubmitting(false);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };


  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Signup</h1>
          {errors && Object.keys(errors).length > 0 && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {errors.message}
              <ul>
                {Object.keys(errors).map((field) =>
                  errors[field].map((message, index) => (
                    <li key={index}>{message}</li>
                  ))
                )}
              </ul>
            </div>
          )}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              message={modalMessage}
            />
          )}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <select
              id="user_type"
              name="user_type"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              value={formData.user_type}
              onChange={handleChange}
              required
            >
               <option>
               Buyer ,Seller ? Please select
              </option>
              <option value={0}>
                Buyer
              </option>
              <option value={1}>Seller</option>
            </select>

            <label
              className="block  w-full text-slate-200 bg-slate-500 rounded mb-2"
              htmlFor="id_pic"
            >
              {" "}
              Upload a Valid ID for Confirmation
            </label>

               <input
              id="id_pic"
              type="file"
              name="id_pic"
              onChange={handleFileChange} // Handle file input separately
            />

             <button
              type="submit"
              className={`w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none mt-4 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              Create Account
            </button>
          </form>
          <div className="text-grey-dark mt-5">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue"
              href="/login"
            >
              &nbsp; Log in
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
