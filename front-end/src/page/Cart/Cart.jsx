import { Button, Card, Checkbox, Col, Empty, Image, InputNumber, List, Row, Typography } from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./Cart.scss";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doAddOrder, doRemoveOrder } from "../../redux/OrderSlice";
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
    console.log(orders);
    
    setOrderItems(orders);
    calculateTotalPrice(orders);
    calculateTotalItems(orders);
  }, [orders]);

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
              <Text delete>{item.originalPrice ? (item.originalPrice * 1.11).toLocaleString() : ''} đ</Text> <br />
              <Text strong style={{ color: "red" }}>{item.currentPrice ? item.currentPrice.toLocaleString() : ''} đ</Text>
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
            <Button icon={<DeleteOutlined />} type="text" danger onClick={() => handleRemoveItem(item.id)} />
          </Col>
        </Row>
      </List.Item>
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setOrderItems(orderItems.map(item => ({ ...item, selected: newSelectAll })));
  };

  const handleRemoveItem = (id) => {
    dispatch(doRemoveOrder({ id }));
    const updatedItems = orderItems.filter(item => item.id !== id);
    setOrderItems(updatedItems);
    calculateTotalPrice(updatedItems);
    calculateTotalItems(updatedItems);
  };

  const handleQuantityChange = (item, quantity) => {
    
    if (typeof quantity !== "number" || isNaN(quantity)) return; // Ngăn chặn giá trị NaN
  
    const updatedItems = orderItems.map(orderItem =>
      orderItem.id === item.id ? { ...orderItem, amount: quantity } : orderItem
    );
    console.log(updatedItems);
    
    setOrderItems(updatedItems);
    calculateTotalPrice(updatedItems);
    calculateTotalItems(updatedItems);
    dispatch(doAddOrder({ item, quantity }));
  };
  

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.currentPrice * item.amount, 0);
    setTotalPrice(total);
  };

  const calculateTotalItems = (items) => {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    setTotalItems(total);
  };

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <Title level={4}>GIỎ HÀNG ({ordersLength} sản phẩm)</Title>
        <div>
          {ordersLength > 0 ? (
            <div className="cart-list">
              <List
                itemLayout="horizontal"
                dataSource={orderItems}
                renderItem={renderItem}
                header={
                  <Row justify="space-between" align="middle">
                    <Col span={4}>
                      <Checkbox checked={selectAll} onChange={handleSelectAll}>
                        <Text strong>Chọn tất cả</Text>
                      </Checkbox>
                    </Col>
                    <Col span={4}><Text strong>Sản phẩm</Text></Col>
                    <Col span={4}><Text strong>Số lượng</Text></Col>
                    <Col span={2}><Text strong>Thành tiền</Text></Col>
                    <Col span={2}></Col>
                  </Row>
                }
              />
            </div>
          ) : (
            <div className=" shadow-lg rounded-lg bg-white flex flex-col items-center justify-center max-w-[1200px] w-full mx-auto ">
              <Card className="w-full  " bordered={false}>
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
    </div>
  );
}

export default Cart;