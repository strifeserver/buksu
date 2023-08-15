import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function UserFormManage() {
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
  border: "1px solid #000", /* Change the border color and width as needed */
  overflow: "hidden"
                  }}
                />

                {imageUrl && (
                 <a  target="_blank" href={imageUrl}> <img
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
                  /> </a>
                )}
              </div>
              <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                <div className="mt-4 mb-21 flex flex-col items-center justify-center ">
                  {/* <h3 className="mb-1.5 text-2xl font-medium text-black dark:text-white"> */}
                  <input
                    value={user.name}
                    onChange={(ev) =>
                      setUser({ ...user, name: ev.target.value })
                    }
                    name="name"
                    className="block border border-grey-light w-30% p-3 rounded mb-4"
                    required
                  />
                  {/* </h3> */}
                  <p className="font-medium">User Info</p>
                  <div className="dark:bg-[#37404F] mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark">
                    <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                      <span className="font-semibold text-black dark:text-white">
                        <input
                          type="date"
                          value={user.birthday}
                          onChange={(ev) =>
                            setUser({ ...user, birthday: ev.target.value })
                          }
                          name="birthday"
                          className="block border border-grey-light w-30% p-3 rounded mb-4"
                          required
                        />
                      </span>
                      <span className="text-sm">Birthday</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                      <span className="font-semibold text-black dark:text-white">
                        <input
                          type="text"
                          value={user.address}
                          onChange={(ev) =>
                            setUser({ ...user, address: ev.target.value })
                          }
                          name="address"
                          className="block border border-grey-light w-30% p-3 rounded mb-4"
                          required
                        />
                      </span>
                      <span className="text-sm">Address</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                      <span className="font-semibold text-black dark:text-white">
                        <input
                          // type="number"
                          className="block border border-grey-light w-30% p-3 rounded mb-4"
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
                          type="text"
                          id="user_type"
                          name="user_type"
                          className="block border border-grey-light w-30% p-3 rounded mb-4"
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
                    <p className="mt-4.5 font-medium text-sm">
                      Click Confirm If all the information in the ID and in the
                      Registration Matches.
                    </p>
                    <p className="mt-4.5 font-medium text-sm">
                      The admin can also edit the information that don't match.
                    </p>
                  </div>
                  <div className="mt-6.5">
                    <h4 className="mb-3.5  mt-12 font-medium text-black dark:text-white">
                      Actions
                    </h4>
                    <div className="flex items-center justify-center gap-3.5">
                      <a
                        onClick={() => setShow(!show)}
                        className="bg-yellow-300 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                      >
                        Update Changes
                      </a>
                      <a
                        href="/admin/users/all"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ====== Profile Section End */}

            {show && (
              <div
                className="relative z-50 bg-black"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg
                              viewBox="0 0 1024 1024"
                              fill="currentColor"
                              height="3em"
                              width="3em"
                            >
                              <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                            </svg>
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3
                              className="text-base font-semibold leading-6 text-gray-900"
                              id="modal-title"
                            >
                              Save Changes?
                            </h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to Update User Info?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setShow(false)}
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}
