import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, List, Tag, Spin, Empty, Typography, Row, Col, Button, Modal, Table, Divider } from 'antd';
import { callGetOrderByUserId, callGetDetaiOrder } from '../../service/OrderService';
import moment from 'moment';
import emtyCart from "../../assets/images/ico_emptycart (1).svg";
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

const HistoryOrder = () => {
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('CREATED');
  const navigate = useNavigate();
  
  // Thêm state cho modal chi tiết đơn hàng
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchOrders = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await callGetOrderByUserId(userId, 1, 100);
      if (res && res.code === 200 && res.result?.result) {
        const sortedOrders = res.result.result.sort((a, b) => moment(b.orderDate).diff(moment(a.orderDate)));
        setAllOrders(sortedOrders);
      } else {
        setAllOrders([]);
        console.error("Failed to fetch orders:", res?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setAllOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  // Thêm hàm để lấy chi tiết đơn hàng
  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
    setDetailLoading(true);

    try {
      const res = await callGetDetaiOrder(order.id);
      if (res && res.code === 200) {
        setOrderDetails(res.result);
      } else {
        console.error("Failed to fetch order details:", res?.message);
        setOrderDetails([]);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setOrderDetails([]);
    } finally {
      setDetailLoading(false);
    }
  };

  const filterOrdersByStatus = (status) => {
    return allOrders.filter(order => order.status === status);
  };

  const renderOrderStatusTag = (status) => {
    let color;
    let text = status;
    switch (status) {
      case 'CREATED':
        color = 'blue';
        text = 'Mới tạo';
        break;
      case 'PENDING':
        color = 'orange';
        text = 'Đang xử lý';
        break;
      case 'DELIVERED':
        color = 'green';
        text = 'Đã giao';
        break;
      case 'CANCELLED':
        color = 'red';
        text = 'Đã hủy';
        break;
      default:
        color = 'default';
    }
    return <Tag color={color}>{text.toUpperCase()}</Tag>;
  };

  const renderPaymentStatusTag = (status) => {
    let color = status === 'PAID' ? 'green' : 'orange';
    let text = status === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán';
    return <Tag color={color}>{text}</Tag>;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderOrderList = (status) => {
    const filteredOrders = filterOrdersByStatus(status);

    if (loading) {
      return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
    }

    if (filteredOrders.length === 0) {
      return <Empty description={`Không có đơn hàng nào ở trạng thái này`} />;
    }

    return (
      <List
        itemLayout="vertical"
        dataSource={filteredOrders}
        renderItem={item => (
          <List.Item
            key={item.id}
            style={{ padding: '16px', border: '1px solid #f0f0f0', marginBottom: '16px', borderRadius: '8px', background: '#fff' }}
          >
            <Row gutter={[16, 8]} justify="space-between" align="middle">
              <Col xs={24} sm={12} md={6}>
                <Text strong>Mã đơn:</Text> #{item.id}
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Text strong>Ngày đặt:</Text> {moment(item.orderDate).isValid() ? moment(item.orderDate).format('DD/MM/YYYY HH:mm') : 'N/A'}
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Text strong>Tổng tiền:</Text> {formatPrice(item.total)}
              </Col>
              <Col xs={24} sm={12} md={4} style={{ textAlign: 'right' }}>
                {renderOrderStatusTag(item.status)}
                {renderPaymentStatusTag(item.paymentStatus)}
              </Col>
              <Col span={24} style={{ marginTop: '8px' }}>
                <Text strong>Địa chỉ:</Text> {item.address}
              </Col>
              <Col span={24} style={{ marginTop: '12px' }}>
                <Button type="primary" onClick={() => handleViewDetails(item)}>
                  Xem chi tiết
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    );
  };

  // Thêm cột cho bảng chi tiết đơn hàng
  const detailColumns = [
    {
      title: 'Mã sách',
      dataIndex: 'bookId',
      key: 'bookId',
      width: '20%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '20%',
      align: 'center',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      width: '30%',
      align: 'right',
      render: (price) => formatPrice(price),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      width: '30%',
      align: 'right',
      render: (total) => formatPrice(total),
    },
  ];

  // Tính tổng tiền các sản phẩm
  const calculateTotal = () => {
    return orderDetails.reduce((sum, item) => sum + item.total, 0);
  };

  // Show initial loading spinner
  if (loading && allOrders.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" tip="Đang tải đơn hàng..." /></div>;
  }

  // Show empty state if no orders found after loading
  if (!loading && allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 p-10">
        <img
          src={emtyCart}
          alt="Empty Orders"
          className="w-32 h-32"
        />
        <p className="text-gray-500 text-lg font-medium">
          Bạn chưa có đơn hàng nào
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1px' }}>
      <Tabs defaultActiveKey="CREATED" activeKey={activeTab} onChange={(key) => setActiveTab(key)} type="card">
        <TabPane tab={`Mới tạo (${filterOrdersByStatus('CREATED').length})`} key="CREATED">
          {renderOrderList('CREATED')}
        </TabPane>
        <TabPane tab={`Đang xử lý (${filterOrdersByStatus('PENDING').length})`} key="PENDING">
          {renderOrderList('PENDING')}
        </TabPane>
        <TabPane tab={`Đã giao (${filterOrdersByStatus('DELIVERED').length})`} key="DELIVERED">
          {renderOrderList('DELIVERED')}
        </TabPane>
        <TabPane tab={`Đã hủy (${filterOrdersByStatus('CANCELLED').length})`} key="CANCELLED">
          {renderOrderList('CANCELLED')}
        </TabPane>
      </Tabs>

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal
        title={<Title level={4}>Chi tiết đơn hàng #{selectedOrder?.id}</Title>}
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={800}
      >
        {detailLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" tip="Đang tải chi tiết đơn hàng..." />
          </div>
        ) : (
          <>
            {selectedOrder && (
              <div style={{ marginBottom: '20px' }}>
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Text strong>Mã đơn hàng:</Text> #{selectedOrder.id}
                  </Col>
                  <Col span={12}>
                    <Text strong>Ngày đặt:</Text> {moment(selectedOrder.orderDate).isValid() ? moment(selectedOrder.orderDate).format('DD/MM/YYYY HH:mm') : 'N/A'}
                  </Col>
                  <Col span={12}>
                    <Text strong>Trạng thái đơn hàng:</Text> {renderOrderStatusTag(selectedOrder.status)}
                  </Col>
                  <Col span={12}>
                    <Text strong>Trạng thái thanh toán:</Text> {renderPaymentStatusTag(selectedOrder.paymentStatus)}
                  </Col>
                  <Col span={24}>
                    <Text strong>Địa chỉ giao hàng:</Text> {selectedOrder.address}
                  </Col>
                </Row>
              </div>
            )}
            
            <Divider orientation="left">Danh sách sản phẩm</Divider>
            
            <Table 
              columns={detailColumns}
              dataSource={orderDetails}
              rowKey={(record) => `${record.orderId}-${record.bookId}`}
              pagination={false}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <Text strong>Tổng cộng:</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong>{formatPrice(calculateTotal())}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default HistoryOrder;