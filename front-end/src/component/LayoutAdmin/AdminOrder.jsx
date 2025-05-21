import { Table, message } from "antd";
import { useEffect, useState } from "react";
import { callGetAllOrder } from "../../service/OrderService";
import { IoMdPersonAdd } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { FiRefreshCcw } from "react-icons/fi";
import OrderDetailDrawer from "./DrawerDetail/DrawerDetailOrder";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const AdminOrder = () => {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleUpdateProduct, setVisibleUpdateProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [sort, setSort] = useState({ field: "id", order: "asc" });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await callGetAllOrder(
        currentPage,
        limit,
        sort.field,
        sort.order
      );
      if (res && res.code === 200) {
        setTotal(res.result.totalElements);
        setData(res.result.result);
      } else {
        message.error("Không thể tải danh sách đơn hàng!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tải danh sách đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [currentPage, limit, sort]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      width: 100,

    },
    {
      title: "Người Dùng",
      dataIndex: "userId",
      key: "userId",
      sorter: true, // Thêm sắp xếp
      width: 150,
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} VND`,
      sorter: true, // Thêm sắp xếp
      width: 150,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      render: (address) => address || "Không có địa chỉ",
      width: 200,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusMap = {
          PENDING: {
            label: "Đang giao hàng",
            className:
              "text-yellow-600 bg-yellow-100 border border-yellow-400 px-2 py-1 rounded",
          },
          DELIVERED: {
            label: "Đã giao hàng",
            className:
              "text-green-600 bg-green-100 border border-green-400 px-2 py-1 rounded",
          },
          CANCELLED: {
            label: "Đã hủy hàng",
            className:
              "text-red-600 bg-red-100 border border-red-400 px-2 py-1 rounded",
          },
          CREATED: {
            label: "Đã đặt hàng",
            className:
              "text-blue-600 bg-blue-100 border border-blue-400 px-2 py-1 rounded",
          },
        };

        const statusInfo = statusMap[status] || {
          label: "Không xác định",
          className:
            "text-gray-600 bg-gray-100 border border-gray-400 px-2 py-1 rounded",
        };

        return <span className={statusInfo.className}>{statusInfo.label}</span>;
      },
      width: 150,
      sorter: (a, b) => {
        const statusOrder = {
          PENDING: 1,
          CREATED: 2,
          DELIVERED: 3,
          CANCELLED: 4,
        };
        return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      },
    },
    {
      title: "Ngày Đặt Hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
      sorter: true, // Thêm sắp xếp
      width: 200,
    },
    ,
    {
      title: "Hành Động",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            onClick={() => {
              setSelectedOrder(record); // Lưu toàn bộ thông tin đơn hàng
              setDrawerVisible(true);
            }}
          >
            <BsPencilSquare />
          </button>
        </div>
      ),
      width: 150,
    },
  ];
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
      setSort({ field: "id", order: "asc" });
    }
    if (
      limit === newLimit &&
      currentPage === newCurrentPage &&
      sort.field === "id" &&
      sort.order === "asc"
    ) {
      getOrders();
    }
  };
  const onChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter?.order === undefined) {
      setSort({ field: "id", order: "asc" });
    } else {
      setSort({
        field: sorter.field,
        order: sorter.order === "ascend" ? "asc" : "desc",
      });
    }
  };

  return (
    <div className="container_admin  bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý đơn hàng
      </h1>
      <div className="container_admin_header flex justify-between items-center mb-4">
        <div className="manage_button flex gap-4">
          <button
            className="btn flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setVisible(true)}
          >
            <IoMdPersonAdd />
            <span>Thêm Đơn Hàng</span>
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
        {/* <Search
                placeholder="Tìm kiếm sách"
                allowClear
                enterButton="Tìm kiếm"
                size="large"
                onSearch={handleSearch} 
                style={{ maxWidth: "300px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
      </div>
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trong tổng số ${total} đơn hàng`,
        }}
        onChange={onChange}
        className="bg-white shadow-md rounded-lg"
        scroll={{ x: "max-content" }}
        rowClassName={(record, index) =>
          `hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`
        }
      />
      <OrderDetailDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        orderId={selectedOrder?.id} address={selectedOrder?.address}
        status={selectedOrder?.status}
        orderDate={selectedOrder?.orderDate}
        userId={selectedOrder?.userId}
        total={selectedOrder?.total}
        paymentStatus={selectedOrder?.paymentStatus}
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
        handleRefesh={handleRefesh}
      />
    </div>
  );
};

export default AdminOrder;
