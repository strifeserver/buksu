import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

import { Table, Button, Pagination } from "flowbite-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { setNotification } = useStateContext();

  const { setUser, notification } = useStateContext();

  useEffect(() => {
    axiosClient.get("/users").then(({ data }) => {
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
      .get(`/users?page=${currentPage}`)
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
    <div>
      <div>
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Birthday</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Create Date</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          {loading && (
            <Table.Body>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </Table.Body>
          )}
          {!loading && (
            <Table.Body className="divide-y">
              {users.map((u) => (
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
                    {u.email}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {u.created_at}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      to={"/users/" + u.id}
                    >
                      Edit
                    </Link>
                    &nbsp;
                    <a
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={(ev) => onDeleteClick(u)}
                    >
                      Delete
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>

         {notification && <div className="notification">{notification}</div>}

        <div className="flex items-center justify-center text-center mt-3">
        <Pagination
      currentPage={currentPage}
      onPageChange={page=>{setCurrentPage(page)}}
      showIcons
      totalPages={totalPages}
    />
  </div>
      </div>
    </div>
  );
}
