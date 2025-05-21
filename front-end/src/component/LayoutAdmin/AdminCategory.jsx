import { Table, message } from "antd";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { callGetAllCate } from "../../service/AdminService";

const AdminCategory = () => {
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleUpdateCategory, setVisibleUpdateCategory] = useState(false);
  const [category, setCategory] = useState({});
  const [sort, setSort] = useState({ field: "id", order: "desc" });
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    setLoading(true);
    let res = await callGetAllCate(limit, currentPage, sort.field, sort.order);
    console.log(res);

    if (res && res.code === 200) {
      setTotal(res.result.totalElements);
      setData(res.result.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, [limit, currentPage, sort]);

  const handleEdit = (record) => {
    setVisibleUpdateCategory(true);
    setCategory(record);
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
    if (sort.field !== "id") {
      setSort({ field: "id", order: "desc" });
    }
    if (
      limit === newLimit &&
      currentPage === newCurrentPage &&
      sort.field === "id" &&
      sort.order === "desc"
    ) {
      getCategories();
    }
  };
  const handleDeleteCategory = async (id) => {
    let res = await callDeleteCategory(id);
    if (res && +res.EC === 0) {
      message.success(res.EM);
      getCategories();
    } else {
      message.error(res.EM);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: 100,
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "name",
      sorter: true,
      width: 200,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={image}
            alt="Category"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ) : (
          <span>Không có ảnh</span>
        ),
      width: 100,
    },
    // {
    //   title: "Hành Động",
    //   dataIndex: "action",
    //   render: (_, record) => (
    //     <div className="flex gap-2">
    //       <button
    //         className="flex items-center justify-center bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
    //         onClick={() => handleEdit(record)}
    //       >
    //         <BsPencilSquare />
    //       </button>
    //       <button
    //         className="flex items-center justify-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-200"
    //         onClick={() => handleDeleteCategory(record.id)}
    //       >
    //         <MdDelete />
    //       </button>
    //     </div>
    //   ),
    //   width: 150,
    // },
  ];

  const onChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setLimit(pagination.pageSize);

    if (sorter?.order === undefined) {
      setSort({ field: "id", order: "desc" });
    } else {
      setSort({
        field: sorter.field,
        order: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };

  return (
    <div className="container_admin p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý danh mục
      </h1>
      <div className="container_admin_header flex justify-between items-center mb-4">
        <div className="manage_button flex gap-4">
          <button
            className="btn flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setVisible(true)}
          >
            <IoMdPersonAdd />
            <span>Thêm danh mục</span>
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
        dataSource={data.map((item) => ({
          ...item,
          key: item.id, // Đảm bảo mỗi hàng có key duy nhất
        }))}
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
        scroll={{ x: "max-content" }}
        rowClassName={(record, index) =>
          `hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`
        }
        loading={loading}
      />
    </div>
  );
};

export default AdminCategory;
