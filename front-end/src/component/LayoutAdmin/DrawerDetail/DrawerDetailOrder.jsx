import { Drawer, Descriptions, Spin, Table, message, Tag, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { callGetDetaiOrder, callUpdateOrder } from "../../../service/OrderService";
import { callGetBookById } from "../../../service/AdminService";
import axios from "axios";

const ORDER_STATUS_OPTIONS = [
  { value: "PENDING", label: "Đang xử lý" },
  { value: "DELIVERED", label: "Đã giao hàng" },
  { value: "CANCELLED", label: "Đã hủy" },
];

const OrderDetailDrawer = ({
  visible,
  onClose,
  orderId,
  address,
  status,
  orderDate,
  userId,
  total,
  paymentStatus,
  drawerVisible,
  setDrawerVisible,
  handleRefesh
}) => {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [bookInfoMap, setBookInfoMap] = useState({});
  const [orderStatus, setOrderStatus] = useState(status);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (visible && orderId) {
      fetchOrderDetail();
      setOrderStatus(status);
      setShowUpdateBtn(false);
    } else {
      setOrderDetail([]);
    }
  }, [visible, orderId, status]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await callGetDetaiOrder(orderId);
      if (res && res.code === 200) {

        setOrderDetail(res.result);
        const bookIds = [...new Set(res.result.map(item => item.bookId))];
        const bookInfoArr = await Promise.all(
          bookIds.map(async (id) => {
            try {
              const bookRes = await callGetBookById(id);
              if (bookRes && bookRes.code === 200) {
                return { id, ...bookRes.result };
              }
            } catch {
              return { id };
            }
          })
        );
        const infoMap = {};
        bookInfoArr.forEach(book => {
          infoMap[book.id] = book;
        });
        setBookInfoMap(infoMap);
      } else {
        message.error("Không thể tải chi tiết đơn hàng!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tải chi tiết đơn hàng!");
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentStatus = (status) => {
    const isPaid = status === "SUCCESS"
    console.log("Payment status:", isPaid);
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
      width: 80,
    },
    {
      title: "Ảnh",
      dataIndex: "bookId",
      key: "thumbnail",
      width: 80,
      render: (bookId) =>
        bookInfoMap[bookId]?.thumbnail ? (
          <img
            src={bookInfoMap[bookId].thumbnail}
            alt={bookInfoMap[bookId].title}
            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          <span>--</span>
        ),
    },
    {
      title: "Tên Sách",
      dataIndex: "bookId",
      key: "title",
      width: 200,
      render: (bookId) => bookInfoMap[bookId]?.title || "--",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} VND`,
      width: 120,
      align: "right",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} VND`,
      width: 120,
      align: "right",
    },
  ];

  const calculateGrandTotal = () => {
    return orderDetail.reduce((sum, item) => sum + item.total, 0);
  };

  const handleStatusChange = (value) => {
    setOrderStatus(value);
    setShowUpdateBtn(value !== status);
  };

  const handleUpdateStatus = async () => {
    setUpdating(true);
    try {
      const res = await callUpdateOrder(orderId, orderStatus);
      console.log("Update order response:", res);

      if (res && res.code === 200) {
        message.success("Cập nhật trạng thái thành công!");
        setShowUpdateBtn(false);
        setDrawerVisible(false);
        handleRefesh()
      } else {
        message.error("Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      message.error("Có lỗi khi cập nhật trạng thái!");
    } finally {
      setUpdating(false);
    }
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
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Select
                  value={orderStatus}
                  // style={{ width: 200 }}
                  onChange={handleStatusChange}
                  disabled={updating}
                >
                  <Select.Option value="PENDING">
                    <Tag color="orange">Đang xử lý</Tag>
                  </Select.Option>
                  <Select.Option value="DELIVERED">
                    <Tag color="green">Đã giao hàng</Tag>
                  </Select.Option>
                  <Select.Option value="CANCELLED">
                    <Tag color="red">Đã hủy</Tag>
                  </Select.Option>
                </Select>
              </div>
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
                  <Table.Summary.Cell index={0} colSpan={5} className="text-right font-bold">
                    Tổng cộng:
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} className="text-right font-bold">
                    {calculateGrandTotal().toLocaleString("vi-VN")} VND
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />

          <div className="flex justify-end mt-6">
            <Button
              type="primary"
              loading={updating}
              onClick={handleUpdateStatus}
              disabled={!showUpdateBtn}
            >
              Cập nhật
            </Button>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default OrderDetailDrawer;