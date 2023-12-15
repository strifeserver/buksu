import React, { useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import Swal from 'sweetalert2';

export default function AProductOrder() {
  const { currentUserID } = useStateContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    transactionID: id,
    imageProof: [],
    user_ID: currentUserID,
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      imageProof: [...formData.imageProof, ...files],
    });
  };

  const handleRemoveFile = (fileName) => {
    const updatedFiles = formData.imageProof.filter(
      (file) => file.name !== fileName
    );
    setFormData({
      ...formData,
      imageProof: updatedFiles,
    });
  };

  const handleUpload = async () => {
    Swal.showLoading();

    try {
      const response = await axiosClient.post('/confirmDelivery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.close();

      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order has been marked delivered",
          showConfirmButton: false,
          timer: 1500
        });

        navigate("/seller/center");
      }

    } catch (error) {
      console.error('Error uploading files', error);
    }
  };

  const styles = {
    fileList: {
      marginTop: '10px',
    },
    ul: {
      listStyleType: 'none',
      padding: '0',
      textAlign: 'right', // Right-align the list
    },
    li: {
      marginBottom: '5px',
    },
    removeButton: {
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '2px 5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  return (
    <div>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        className="items-center"
      >
        <Tabs.Item active icon={HiUserCircle} title="Confirm Delivery">

          <div className="w-full h-screen bg-slate-100 mt-0 p-16">

            <div className="relative">
              <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50"></div>
              <p className="text-center font-normal text-xl leading-5 text-gray-800 md:mt-5 mt-3">
                UPLOAD PROOF OF DELIVERY
              </p>
              <br />

            </div>
            <div>
              <input type="file" multiple onChange={handleFileChange} />
              {formData.imageProof.length > 0 && (
                <div style={styles.fileList}>
                  <h4>Selected Files:</h4>
                  <ul style={styles.ul}>
                    {formData.imageProof.map((file) => (
                      <li key={file.name} style={styles.li}>
                        {file.name}{' '}
                        <button
                          style={styles.removeButton}
                          onClick={() => handleRemoveFile(file.name)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={handleUpload}
                className="focus:outline-none focus:ring-2 hover:bg-green focus:ring-offset-2 focus:ring-green-800 font-medium text-base leading-4 text-white bg-green-800 w-full py-4 lg:mt-4 mt-2"
              >
                Confirm Delivered
              </button>
            </div>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div >
  );
}
