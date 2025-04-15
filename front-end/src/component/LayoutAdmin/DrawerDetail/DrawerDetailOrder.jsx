import { Drawer, Descriptions, Spin, Table, message } from "antd";
import { useEffect, useState } from "react";
import { callGetDetaiOrder } from "../../../service/OrderService";

const OrderDetailDrawer = ({ visible, onClose, orderId }) => {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (visible && orderId) {
      fetchOrderDetail();
    }
  }, [visible, orderId]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await callGetDetaiOrder(orderId);
      if (res && res.code === 200) {
        setOrderDetail(res.result); // Mảng sản phẩm trong đơn hàng
        setOrderInfo({
          id: orderId,
          userId: res.result[0]?.userId || "Không xác định",
          total: res.result.reduce((sum, item) => sum + item.total, 0),
          address: res.result[0]?.address || "Không có địa chỉ",
          status: res.result[0]?.status || "Không xác định",
          orderDate: res.result[0]?.orderDate || null,
        });
      } else {
        message.error("Không thể tải chi tiết đơn hàng!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tải chi tiết đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID Sách",
      dataIndex: "bookId",
      key: "bookId",
      width: 100,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} VND`,
      width: 150,
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} VND`,
      width: 150,
    },
  ];

  return (
    <Drawer
      title={`Chi tiết đơn hàng #${orderId}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
    >
      {loading ? (
        <Spin tip="Đang tải chi tiết đơn hàng..." />
      ) : (
        <>
          <Descriptions bordered column={1} className="mb-4">
            <Descriptions.Item label="ID Đơn Hàng">{orderInfo?.id}</Descriptions.Item>
            <Descriptions.Item label="Người Dùng">{orderInfo?.userId}</Descriptions.Item>
            <Descriptions.Item label="Tổng Tiền">
              {orderInfo?.total?.toLocaleString("vi-VN")} VND
            </Descriptions.Item>
            <Descriptions.Item label="Địa Chỉ">{orderInfo?.address}</Descriptions.Item>
            <Descriptions.Item label="Trạng Thái">{orderInfo?.status}</Descriptions.Item>
            <Descriptions.Item label="Ngày Đặt Hàng">
              {orderInfo?.orderDate
                ? new Date(orderInfo?.orderDate).toLocaleString("vi-VN")
                : "Không xác định"}
            </Descriptions.Item>
          </Descriptions>
          <Table
            columns={columns}
            dataSource={orderDetail.map((item, index) => ({ ...item, key: index }))}
            pagination={false}
            bordered
          />
        </>
      )}
    </Drawer>
  );
};

export default OrderDetailDrawer;