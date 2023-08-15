import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    address: "",
    mobile_number: "",
    is_verified: "",
    user_type: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [userType, setUserType] = useState();
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
          setUserType(data.user_type);
          setImageUrl(`http://127.0.0.1:8000/storage/Users/${data.id_pic}`);
        })
        .catch(() => {
          setLoading(false);
        });
    }, [id]);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          alert("User was successfully updated");
          navigate("/admin/users/all");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/admin/users/all");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            {/* ====== Profile Section Start */}

            <div className="overflow-hidden rounded-sm border border-stroke bg-gray-200 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="mt-1">
                <h4 className="mb-3.5  bg-blue-200 mt-12 font-medium text-black text-center dark:text-white">
                  Account Status:
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  <p className="bg-green-500  text-white font-semibold py-2 px-4 rounded ">
                    Activated Account
                  </p>
                  <a
                    href="/admin/users/all"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Back
                  </a>
                </div>
              </div>
              <div className="relative z-20 h-35 md:h-65">
                <img
                  src="https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg"
                  alt="profile cover"
                  className="rounded-tl-sm rounded-tr-sm object-cover object-center"
                  style={{
                    width: "120px",
                    height: "120px",
                    display: "block",
                    margin: "0 auto",
                    marginTop: "21px",
                    zIndex: 0, // Default z-index for the second image
                    borderRadius: "50%",
                    border:
                      "1px solid #000" /* Change the border color and width as needed */,
                    overflow: "hidden",
                  }}
                />

                {imageUrl && (
                  <a target="_blank" href={imageUrl}>
                    {" "}
                    <img
                      src={imageUrl}
                      alt="profile"
                      style={{
                        width: "500px",
                        height: "300px",
                        display: "block",
                        margin: "0 auto",
                        marginTop: "21px",
                        zIndex: 0, // Default z-index for the second image
                      }}
                    />{" "}
                  </a>
                )}
              </div>
              <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                <div className="mt-4 mb-21 flex flex-col items-center justify-center ">
                  {/* <h3 className="mb-1.5 text-2xl font-medium text-black dark:text-white"> */}
                  <input
                  readOnly
                    value={user.name}
                    onChange={(ev) =>
                      setUser({ ...user, name: ev.target.value })
                    }
                    name="name"
                    className="block text-center w-30% p-3 rounded mb-4"
                    required
                  />
                  {/* </h3> */}
                  <p className="font-medium">User Info</p>
                  <div className="dark:bg-[#37404F] mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark">
                    <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                      <span className="font-semibold text-black dark:text-white">
                        <input
                        readOnly
                          type="date"
                          value={user.birthday}
                          onChange={(ev) =>
                            setUser({ ...user, birthday: ev.target.value })
                          }
                          name="birthday"
                          className="block text-center  w-30% p-3 rounded mb-4"
                          required
                        />
                      </span>
                      <span className="text-sm">Birthday</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                      <span className="font-semibold text-black dark:text-white">
                        <input
                        readOnly
                          type="text"
                          value={user.address}
                          onChange={(ev) =>
                            setUser({ ...user, address: ev.target.value })
                          }
                          name="address"
                          className="block  text-center w-30% p-3 rounded mb-4"
                          required
                        />
                      </span>
                      <span className="text-sm">Address</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                      <span className="font-semibold text-black dark:text-white">
                        <input
                        disabled
                        type="number"
                          className="block  text-center w-30% p-3 rounded mb-4"
                          value={user.mobile_number}
                          name="mobile_number"
                          onChange={(ev) =>
                            setUser({ ...user, mobile_number: ev.target.value })
                          }
                          required
                        />
                      </span>
                      <span className="text-sm">Mobile Number</span>
                    </div>
                  </div>
                  <div className="mx-auto max-w-180">
                    <div className="mb-6 flex flex-col items-center justify-center">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        User Type
                      </label>
                      <div className="items-center object-center justify-center ">
                        <select
                        readOnly
                          type="text"
                          id="user_type"
                          name="user_type"
                          className="block text-center w-30% p-3 rounded mb-4"
                          onChange={(ev) =>
                            setUser({ ...user, user_type: ev.target.value })
                          }
                          required
                        >
                          <option>Buyer ,Seller ? Please re -confirm</option>
                          <option selected={userType === 0} value={0}>
                            Buyer
                          </option>
                          <option selected={userType === 1} value={1}>
                            Seller
                          </option>
                          <option selected={userType === 2} value={2}>
                            Buyer / Seller
                          </option>
                          <option selected={userType === 3} value={3}>
                            Admin / DA
                          </option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* ====== Profile Section End */}
          </form>
        )}
      </div>
    </>
  );
}
