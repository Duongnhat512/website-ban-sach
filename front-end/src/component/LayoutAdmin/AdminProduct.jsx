import { Table, message, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import {
  callGetAllBooks,
  callGetBookSearch,
  callUploadThumbnail,
} from "../../service/BookService";
import {
  callCreateBook,
  callDeleteBookById,
  callUpdateBookById,
} from "../../service/AdminService";
import DrawerCreateBook from "./DrawerCreate/DrawerCreateBook";
import DrawerUpdateBook from "./DrawerUpdate/DrawerUpdateBook";
const { Search } = Input;
const AdminProduct = () => {
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleUpdateProduct, setVisibleUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [sort, setSort] = useState({ field: "id", order: "desc" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const getProduct = async () => {
    setLoading(true);
    let res = await callGetAllBooks(limit, currentPage, sort.field, sort.order);
    if (res && res.code === 200) {
      setTotal(res.result.totalElements);
      setData(res.result.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, [limit, currentPage, sort]);
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
    if(search !== "") {
      setSearch("");
      getProduct();
    }
    if (
      limit === newLimit &&
      currentPage === newCurrentPage &&
      sort.field === "id" &&
      sort.order === "desc" &&
      search === ""
    ) {
      getProduct();
    }
  };
  const handleEdit = (record) => {
    console.log(record);
    setProduct(record);
    setVisibleUpdateProduct(true);
  };
  const handleCreateBook = async (bookData, thumbnail) => {
    try {
      const res = await callCreateBook(bookData);
      if (res && res.code === 201) {
        let resUpload = await callUploadThumbnail(res.result.id, thumbnail);
        if (resUpload && resUpload.code === 200) {
          message.success("Tạo sách thành công!");
          handleRefesh();
          setVisible(false);
        }
      } else {
        message.error("Tạo sách thất bại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tạo sách!");
    }
  };
  const handleUpdateBook = async (id, thumbnail, bookdata) => {
    try {
      const res = await callUpdateBookById(id, bookdata);
      if (res && res.code === 200) {
        console.log(thumbnail);

        if (thumbnail && thumbnail.length > 0) {
          let resUpload = await callUploadThumbnail(id, thumbnail);
          if (resUpload && resUpload.code === 200) {
            message.success("Cập nhật sách thành công!");
            handleRefesh();
            setVisibleUpdateProduct(false);
          }
        } else {
          message.success("Cập nhật sách thành công!");
          handleRefesh();
          setVisibleUpdateProduct(false);
        }
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật sách!");
    }
  };
  const handleDeleteProduct = async (id) => {
    let res = await callDeleteBookById(id);
    if (res && res.code === 200) {
      message.success("Xóa sản phẩm thành công");
      getProduct();
    } else {
      message.error("Xóa sản phẩm thất bại");
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: 100, // Chiều rộng cố định
    },
    {
      title: "Hình Ảnh",
      dataIndex: "thumbnail",
      render: (thumbnail) =>
        thumbnail ? (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="w-16 h-16 object-cover rounded-md"
          />
        ) : null, // Không hiển thị gì nếu thumbnail là null
      width: 120,
    },
    {
      title: "Tên Sách",
      dataIndex: "title",
      sorter: true,
      width: 200,
    },
    {
      title: "Tác Giả",
      dataIndex: "author",
      sorter: true,
      width: 150,
    },
    {
      title: "Giá Gốc",
      dataIndex: "originalPrice",
      render: (price) =>
        price ? `${parseFloat(price).toLocaleString("vi-VN")} VND` : null,
      sorter: true,
      width: 150,
    },
    {
      title: "Giá Hiện Tại",
      dataIndex: "currentPrice",
      render: (price) =>
        price ? `${parseFloat(price).toLocaleString("vi-VN")} VND` : null,
      sorter: true,
      width: 150,
    },
    {
      title: "Giảm Giá",
      dataIndex: "discount",
      render: (discount) => (discount ? `${discount * 100}%` : null),
      sorter: true,
      width: 100,
    },
    {
      title: "Ngày Phát Hành",
      dataIndex: "releasedDate",
      render: (date) => {
        if (!date) return null; // Không hiển thị gì nếu date là null
        const d = new Date(date[0], date[1] - 1, date[2]);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      },
      sorter: true,
      width: 150,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      sorter: true,
      width: 100,
    },
    {
      title: "Nhà Xuất Bản",
      dataIndex: "publisher",
      sorter: true,
      width: 150,
    },
    {
      title: "Số Trang",
      dataIndex: "pages",
      sorter: true,
      width: 100,
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
      width: 150,
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
      setSort({ field: "id", order: "desc" });
    } else {
      setSort({
        field: sorter.field,
        order: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };
  const handleSearch = async () => {
    try {
      const res = await callGetBookSearch(
        currentPage,
        limit,
        sort.field,
        sort.order,
        "title",
        search
      );
      if (res && res.code === 200) {
        setTotal(res.result.totalElements);
        setData(res.result.result);
      } else {
        message.error("Không tìm thấy sản phẩm nào!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tìm kiếm!");
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
            onClick={() => handleRefesh()}
          >
            <FiRefreshCcw />
            <span>Refresh</span>
          </button>
        </div>
        <Search
          placeholder="Tìm kiếm sách"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onSearch={handleSearch} 
          style={{ maxWidth: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
        scroll={{ x: "max-content" }}
        rowClassName={(record, index) =>
          `hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`
        }
        loading={loading}
      />
      <DrawerCreateBook
        visible={visible}
        onClose={() => setVisible(false)}
        onCreate={handleCreateBook}
      />
      <DrawerUpdateBook
        visible={visibleUpdateProduct}
        onClose={() => setVisibleUpdateProduct(false)}
        onUpdate={handleUpdateBook}
        product={product}
      />
    </div>
  );
};

export default AdminProduct;
