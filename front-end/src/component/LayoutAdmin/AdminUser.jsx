import { Table, message, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { callGetAllUsers } from "../../service/UserService";
const { Search } = Input;
function AdminUser() {
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleUpdateUser, setVisibleUpdateUser] = useState(false);
  const [user, setUser] = useState({});
  const [sort, setSort] = useState({ field: "updatedAt", order: "desc" });
  const [search, setSearch] = useState("");
  const getUser = async () => {
    console.log(sort.field, sort.order);

    let res = await callGetAllUsers(limit, currentPage, sort.field);
    console.log(res);

    if (res && res.code === 200) {
      setTotal(res.result.totalElements);
      setData(res.result.result);
    }
  };
  useEffect(() => {
    getUser();
  }, [limit, currentPage, sort]);
  const handleEdit = (record) => {
    setVisibleUpdateUser(true);
    setUser(record);
  };
  const handleRefesh = () => {
    const newLimit = 4;
    const newCurrentPage = 1;

    if (limit !== newLimit) {
      setLimit(newLimit);
    }

    if (currentPage !== newCurrentPage) {
      setCurrentPage(newCurrentPage);
    }

    if (limit === newLimit && currentPage === newCurrentPage) {
      getUser(newCurrentPage, newLimit);
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      render: (text, record) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: true,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: true,
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            onClick={() => handleEdit(record)}
          >
            <BsPencilSquare />
          </button>
          <button
            className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200"
            onClick={() => handleDeleleUser(record.id)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];
  const exportToExcel = (data, fileName) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, fileName);
  };
  const onChange = (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter?.order === undefined) {
      // If the order is undefined, reset the sort state
      setSort({ field: "", order: "" });
    } else {
      // Otherwise, update the sort state with the new field and order
      setSort({
        field: sorter.field,
        order: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };
  return (
    <div className="container_admin p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý người dùng
      </h1>
      <div className="container_admin_header flex justify-between items-center mb-4">
        <div className="manage_button flex gap-4">
          <button
            className="btn flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setVisible(true)}
          >
            <IoMdPersonAdd />
            <span>Thêm người dùng</span>
          </button>
          <button
            className="btn flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => exportToExcel(data, "users.xlsx")}
          >
            <SiMicrosoftexcel />
            <span>Export Excel</span>
          </button>
          <button
            className="btn flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => handleRefesh()}
          >
            <FiRefreshCcw />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        onChange={onChange}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="bg-white shadow-md rounded-lg"
      />
      {/* <ModalCreateUser
        visible={visible}
        setVisible={setVisible}
        handleRefesh={handleRefesh}
      />
      <ModalUpdateUser
        visibleUpdateUser={visibleUpdateUser}
        setVisibleUpdateUser={setVisibleUpdateUser}
        user={user}
        handleRefesh={handleRefesh}
      /> */}
    </div>
  );
}

export default AdminUser;
