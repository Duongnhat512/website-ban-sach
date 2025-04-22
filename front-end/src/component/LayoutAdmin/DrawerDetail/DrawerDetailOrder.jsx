import { Drawer, Descriptions, Spin, Table, message, Tag } from "antd";
import { useEffect, useState } from "react";
import { callGetDetaiOrder } from "../../../service/OrderService";

const OrderDetailDrawer = ({ 
  visible,
  onClose,
  orderId,
  address,
  status,
  orderDate,
  userId,
  total,
  paymentStatus 
}) => {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    if (visible && orderId) {
      fetchOrderDetail();
    } else {
      setOrderDetail([]);
    }
  }, [visible, orderId]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await callGetDetaiOrder(orderId);
      if (res && res.code === 200) {
        setOrderDetail(res.result);
      } else {
        message.error("Không thể tải chi tiết đơn hàng!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tải chi tiết đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  const renderOrderStatus = (status) => {
    const statusMap = {
      PENDING: { color: "orange", text: "Đang xử lý" },
      DELIVERED: { color: "green", text: "Đã giao hàng" },
      CANCELLED: { color: "red", text: "Đã hủy" },
      CREATED: { color: "blue", text: "Mới tạo" }
    };
    
    const { color, text } = statusMap[status] || { color: "default", text: status || "Không xác định" };
    return <Tag color={color}>{text}</Tag>;
  };

  const renderPaymentStatus = (status) => {
    const isPaid = status === "PAID";
    return <Tag color={isPaid ? "green" : "gold"}>{isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</Tag>;
  };

  const formatDate = (date) => {
    if (!date) return "Không xác định";
    try {
      return new Date(date).toLocaleString("vi-VN");
    } catch {
      return "Định dạng không hợp lệ";
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
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} VND`,
      width: 150,
      align: "right",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} VND`,
      width: 150,
      align: "right",
    },
  ];

  const calculateGrandTotal = () => {
    return orderDetail.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <Drawer
      title={`Chi tiết đơn hàng #${orderId}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={700}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin tip="Đang tải chi tiết đơn hàng..." size="large" />
        </div>
      ) : (
        <>
          <Descriptions bordered column={1} className="mb-6">
            <Descriptions.Item label="ID Đơn Hàng">{orderId}</Descriptions.Item>
            <Descriptions.Item label="ID Người Dùng">{userId}</Descriptions.Item>
            <Descriptions.Item label="Tổng Tiền Đơn Hàng">
              {total?.toLocaleString("vi-VN")} VND
            </Descriptions.Item>
            <Descriptions.Item label="Địa Chỉ Giao Hàng">{address || "Không có địa chỉ"}</Descriptions.Item>
            <Descriptions.Item label="Trạng Thái Đơn Hàng">
              {renderOrderStatus(status)}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng Thái Thanh Toán">
              {renderPaymentStatus(paymentStatus)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày Đặt Hàng">
              {formatDate(orderDate)}
            </Descriptions.Item>
          </Descriptions>
          
          <h3 className="text-lg font-medium mb-4">Chi tiết sản phẩm</h3>
          
          <Table
            columns={columns}
            dataSource={orderDetail.map((item, index) => ({ ...item, key: index }))}
            pagination={false}
            bordered
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold">
                    Tổng cộng:
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} className="text-right font-bold">
                    {calculateGrandTotal().toLocaleString("vi-VN")} VND
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </>
      )}
    </Drawer>
  );
};

export default OrderDetailDrawer;