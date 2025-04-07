import { Table, message, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { callGetAllBooks } from "../../service/BookService";

const AdminProduct = () => {
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleUpdateProduct, setVisibleUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [sort, setSort] = useState({ field: "releasedDate", order: "desc" });

  const getProduct = async () => {
    let res = await callGetAllBooks(limit, currentPage, sort.field, sort.order);
    if (res && res.code === 200) {
      setTotal(res.result.totalElements);
      setData(res.result.result);
    }
  };

  useEffect(() => {
    getProduct();
  }, [limit, currentPage, sort]);

  const handleEdit = (record) => {
    setVisibleUpdateProduct(true);
    setProduct(record);
  };

  const handleDeleteProduct = async (id) => {
    let res = await callDeleteProduct(id);
    if (res && +res.EC === 0) {
      message.success(res.EM);
      getProduct();
    } else {
      message.error(res.EM);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Tên Sách",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá Gốc",
      dataIndex: "originalPrice",
      render: (price) => `${parseFloat(price).toLocaleString("vi-VN")} VND`,
      sorter: true,
    },
    {
      title: "Giá Hiện Tại",
      dataIndex: "currentPrice",
      render: (price) => `${parseFloat(price).toLocaleString("vi-VN")} VND`,
      sorter: true,
    },
    {
      title: "Ngày Phát Hành",
      dataIndex: "releasedDate",
      render: (date) => {
        const d = new Date(date[0], date[1] - 1, date[2]);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      },
      sorter: true,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      sorter: true,
    },
    {
      title: "Nhà Xuất Bản",
      dataIndex: "publisher",
      sorter: true,
    },
    {
      title: "Hành Động",
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
            onClick={() => handleDeleteProduct(record.id)}
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
    utils.book_append_sheet(wb, ws, "Books");
    writeFile(wb, fileName);
  };

  const onChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter?.order === undefined) {
      setSort({ field: "", order: "" });
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
        Quản lý sản phẩm
      </h1>
      <div className="container_admin_header flex justify-between items-center mb-4">
        <div className="manage_button flex gap-4">
          <button
            className="btn flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setVisible(true)}
          >
            <IoMdPersonAdd />
            <span>Thêm sản phẩm</span>
          </button>
          <button
            className="btn flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => exportToExcel(data, "products.xlsx")}
          >
            <SiMicrosoftexcel />
            <span>Export Excel</span>
          </button>
          <button
            className="btn flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => getProduct()}
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
    </div>
  );
};

export default AdminProduct;
