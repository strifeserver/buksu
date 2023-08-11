import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

import {
  Table,
  Button,
  Pagination,
  Spinner,
  Tabs,
  Badge,
} from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export default function Users() {
  const [users1, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setNotification } = useStateContext();
  const { user } = useStateContext();

  if (user) {
    // Output the value of the user
    const name = user.name;
    const phone_number = user.phone_number;
    const id = user.id;
  }

  const id = "NULL";
  // const { setUser, notification } = useStateContext();

  useEffect(() => {
    axiosClient.get("/allUsers/pending").then(({ data }) => {
      setUser(data);
    });
  }, []);
  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted");
      getUsers();
    });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get(`/allUsers/pending?page=${currentPage}`)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setTotalPages(data.meta.last_page);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };



  return (
    <div className="row mt-1">
      <div className="card animated fadeInDown">
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item active icon={HiUserCircle} title="Pending Users">

            <Table className="table-auto">
              <Table.Head>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Birthday</Table.HeadCell>
                <Table.HeadCell>Phone Number</Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>

                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              {loading && (
                <tbody>
                  <tr>
                    <td colSpan="6" class="text-center">
                      <Spinner aria-label="Large spinner example" size="lg" />
                    </td>
                  </tr>
                </tbody>
              )}

              {!loading && (
                <Table.Body className="divide-y">
                  {users1.map((u) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={u.id}
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {u.id}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {u.name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {u.birthday}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {u.mobile_number}
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {u.address}
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          to={"/users/" + u.id}
                        >
                          view
                        </Link>
                        &nbsp;
                        {/* <a
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={(ev) => onDeleteClick(u)}
                    >
                      Delete
                    </a> */}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              )}
            </Table>
            <div className="flex items-center justify-center text-center mt-3">
              <Pagination
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
                showIcons
                totalPages={totalPages}
              />
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
