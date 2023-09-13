import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axiosClient from "../axios-client";

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imageCaptured, setImageCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    fullname: "",
    age: "",
  });

  const handleCapture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImageCaptured(screenshot);

    // Add Fullname and age to formData
    const fullname = document.getElementById("fullname").value;
    const age = document.getElementById("age").value;

    setFormData({
      ...formData,
      image: screenshot,
      fullname: fullname,
      age: age,
    });

    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    webcamRef.current.start();
  };

  const handleClose = () => {
    setOpen(false);
    webcamRef.current.stop();
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".modal")) {
      setOpen(false);
      webcamRef.current.stop();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
    .post("/signup", formData)
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

  return (
    <>
      <button onClick={handleOpen}>Take Photo</button>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal"
            style={{
              width: 600,
              height: 600,
              background: "white",
              borderRadius: 10,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleClickOutside}
          >
            <Webcam
              ref={webcamRef}
              height={600}
              width={600}
              mirrored={true}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.8}
            />
            <button onClick={handleCapture}>Capture</button>
          </div>
        </div>
      )}
      {imageCaptured && (
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="image" value={formData.image} />
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Fullname"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default CustomWebcam;
