import { Button, Card, Checkbox, Col, Divider, Image, InputNumber, List, Row, Typography, message } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./Cart.scss";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doRemoveOrder, doUpdateAmount } from "../../redux/OrderSlice";
import Cart_Empty from "../../assets/images/ico_emptycart.svg";

const { Text } = Typography;

function Cart() {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  const orders = useSelector((state) => state.order.orders);
  const ordersLength = useSelector((state) => state.order.orders.length || 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const itemsWithSelection = orders.map(item => ({
      ...item,
      selected: item.selected !== undefined ? item.selected : false
    }));

    setOrderItems(itemsWithSelection);
    calculateTotalPrice(itemsWithSelection);
    calculateTotalItems(itemsWithSelection);
  }, [orders]);

  // Cập nhật hàm handleSelectAll để tính lại tổng tiền
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Cập nhật trạng thái selected cho tất cả các item
    const updatedItems = orderItems.map(item => ({
      ...item,
      selected: newSelectAll
    }));

    setOrderItems(updatedItems);
    // Tính lại tổng tiền sau khi cập nhật trạng thái các item
    calculateTotalPrice(updatedItems);
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id) => {
    dispatch(doRemoveOrder({ id }));
    const updatedItems = orderItems.filter(item => item.id !== id);
    setOrderItems(updatedItems);
    calculateTotalPrice(updatedItems);
    calculateTotalItems(updatedItems);
  };

  const handleQuantityChange = (item, value) => {
    const newQuantity = Math.max(1, Math.round(value));
    const updatedItems = orderItems.map((orderItem) => {
      if (orderItem.id === item.id) {
        return { ...orderItem, amount: newQuantity };
      }
      return orderItem;
    });
    dispatch(doUpdateAmount({ id: item.id, amount: newQuantity }));
    setOrderItems(updatedItems);
    calculateTotalPrice(updatedItems);
    calculateTotalItems(updatedItems);
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      // Chỉ cộng giá trị nếu item được chọn
      if (item.selected) {
        return sum + item.currentPrice * item.amount;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  };

  const calculateTotalItems = (items) => {
    setTotalItems(items.length);
  };

  const handlePayment = () => {
    const selectedItems = orderItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      message.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      
      return;
    }
    // Chuyển hướng đến trang thanh toán
    navigate("/payment");
  };

  const renderItem = (item) => {
    return (
      <List.Item key={item.id}>
        <Row style={{ width: "100%" }} align="middle">
          <Col span={1}>
            <Checkbox
              checked={item.selected}
              onChange={(e) => {
                const updatedItems = orderItems.map((orderItem) => {
                  if (orderItem.id === item.id) {
                    return { ...orderItem, selected: e.target.checked };
                  }
                  return orderItem;
                });
                setOrderItems(updatedItems);
                calculateTotalPrice(updatedItems);
              }}
            />
          </Col>
          <Col span={3}>
            <Image
              width={80}
              src={item.thumbnail || "https://via.placeholder.com/80"}
              alt="Product Image"
            />
          </Col>
          <Col span={8}>
            <div style={{ marginLeft: 16 }}>
              <Text strong>{item.title}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>{item.releaseDate}</Text>
              <br />
              {/* Ví dụ tính giá gốc tạm thời = currentPrice * 1.11 */}
              <Text delete>
                {item.originalPrice ? (item.currentPrice * 1.11).toLocaleString() : ""}
                &nbsp;đ
              </Text>
              <br />
              <Text strong style={{ color: "red" }}>
                {item.currentPrice ? item.currentPrice.toLocaleString() : ""} đ
              </Text>
            </div>
          </Col>
          <Col span={6}>
            <InputNumber
              min={1}
              value={item.amount}
              onChange={(value) => handleQuantityChange(item, value)}
            />
          </Col>
          <Col span={4}>
            <Text strong style={{ color: "red" }}>
              {(item.currentPrice * item.amount).toLocaleString()} đ
            </Text>
          </Col>
          <Col span={1}>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              danger
              onClick={() => handleRemoveItem(item.id)}
            />
          </Col>
        </Row>
      </List.Item>
    );
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <Title level={4}>GIỎ HÀNG ({ordersLength} sản phẩm)</Title>

        {ordersLength > 0 ? (
          <Row gutter={24}>
            {/* Cột bên trái: Danh sách sản phẩm */}
            <Col xs={24} md={16}>
              <Row justify="space-between" align="middle" className="cart-header">
                <Col span={4}>
                  <Checkbox checked={selectAll} onChange={handleSelectAll}>
                    <Text strong>Chọn tất cả</Text>
                  </Checkbox>
                </Col>
                <Col span={4}>
                  <Text strong>Sản phẩm</Text>
                </Col>
                <Col span={4}>
                  <Text strong>Số lượng</Text>
                </Col>
                <Col span={3}>
                  <Text strong>Thành tiền</Text>
                </Col>
                <Col span={1}></Col>
              </Row>
              <List
                itemLayout="horizontal"
                dataSource={orderItems}
                renderItem={renderItem}
                className="cart-list"
              />
            </Col>

            {/* Cột bên phải: Thông tin khuyến mãi, tổng tiền, thanh toán */}
            <Col xs={24} md={8}>
              <div className="cart-summary">
                <Card bordered={false} className="mb-2 shadow-sm">
                  <Title level={5}>KHUYẾN MÃI</Title>
                  <div style={{ marginBottom: 12 }}>
                    <Text strong>Mã Giảm 10K - Toàn Sàn</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Đơn hàng từ 130k - Không bao gồm một số sản phẩm
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      HSD: 31.03.2025
                    </Text>
                    <br />
                    <Button
                      type="link"
                      style={{ paddingLeft: 0, marginTop: 8 }}
                      icon={<ShoppingOutlined />}
                      onClick={() => navigate("/")}
                    >
                      Mua thêm
                    </Button>
                  </div>
                </Card>

                <Card bordered={false} className="shadow-sm">
                  <Title level={5} style={{ marginBottom: 16 }}>
                    Nhận quà
                  </Title>
                  <div className="summary-info">
                    <Row justify="space-between" style={{ marginBottom: 8 }}>
                      <Text>Thành tiền:</Text>
                      <Text strong style={{ color: "red" }}>
                        {totalPrice.toLocaleString()} đ
                      </Text>
                    </Row>

                    <Divider style={{ margin: "8px 0" }} />

                    <Row justify="space-between" style={{ marginBottom: 8 }}>
                      <Text strong>Tổng số tiền (gồm VAT):</Text>
                      <Text strong style={{ color: "red" }}>
                        {totalPrice.toLocaleString()} đ
                      </Text>
                    </Row>

                    <Button
                      type="primary"
                      block
                      className="mt-2"
                      onClick={handlePayment}
                    >
                      THANH TOÁN
                    </Button>

                    <Text
                      type="secondary"
                      style={{ fontSize: 12, display: "block", marginTop: 8 }}
                    >
                      Bạn sẽ được giảm 0đ cho đơn hàng
                    </Text>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="shadow-lg rounded-lg bg-white flex flex-col items-center justify-center max-w-[1280px] w-full mx-auto ">
            <Card className="w-full" bordered={false}>
              <div className="flex flex-col items-center text-center">
                <img src={Cart_Empty} alt="Empty Cart" className="w-32 mb-4" />
                <p className="text-gray-500 mb-6">
                  Chưa có sản phẩm trong giỏ hàng của bạn.
                </p>
                <Button
                  type="primary"
                  icon={<ShoppingOutlined />}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg"
                  onClick={() => navigate("/")}
                >
                  MUA SẮM NGAY
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;