import React, { useState } from "react";
import axiosClient from "../../axios-client";

export default function PhotoUpload() {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);

    // Add other form data if needed
    // formData.append("title", "Photo Title");
    // formData.append("description", "Photo description");

    axiosClient
    .post("/addProductForm", formData)
    .then((response) => {
      console.log("Photo uploaded successfully");
      // Perform any additional actions after successful upload
    })
    .catch((error) => {
      console.error("Error uploading photo", error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="photo" onChange={handlePhotoChange} />
        <button type="submit">Upload Photo</button>
      </form>
    </div>
  );
}
