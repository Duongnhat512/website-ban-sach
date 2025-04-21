import {
  Form,
  Input,
  Radio,
  Button,
  Modal,
  List,
  Row,
  Col,
  Checkbox,
  Image,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { doRemoveOrder } from "../../redux/OrderSlice";
import "./Payment.scss";
import { Typography } from "antd";
import { callCreateOrder } from "../../service/OrderService";
import { callGetAllPromotions } from "../../service/PromotionService";
import { setAuthToken } from "../../until/customize-axios";
import { message } from "antd";

const { Text } = Typography;

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const [form] = Form.useForm();

  const [name, setName] = useState(user.fullName || "admin");
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [address, setAddress] = useState(user.address || "");
  const [promoMessage, setPromoMessage] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [shippingMethod, setShippingMethod] = useState();
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [promotions, setPromotions] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalShippingFee, setTotalShippingFee] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    const selectedPromotion = promotions.find((promo) => promo.code === promoCode);
    if (!selectedPromotion) {
      setPromoMessage("❌ Mã khuyến mãi không hợp lệ!");
      setTotalDiscount(0);
      return;
    }
    if (totalPrice < (selectedPromotion.minAmount || 0)) {
      setPromoMessage(
        `❌ Đơn hàng phải đạt tối thiểu ${selectedPromotion.minAmount?.toLocaleString()}đ để áp dụng mã này!`
      );
      setTotalDiscount(0);
      return;
    }
    const discountAmount = Math.floor((totalPrice * (selectedPromotion.discount || 0)) / 100);
    setTotalDiscount(discountAmount);
    setPromoMessage("✅ Áp dụng mã khuyến mãi thành công!");
  };

  const onSelectPromotion = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleShippingMethodChange = (e) => {
    setTotalShippingFee(e.target.value);
    setShippingMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (!agreed) {
      message.error("Vui lòng đồng ý với Điều khoản & Điều kiện.");
      return;
    }
    if (!shippingMethod) {
      message.error("Vui lòng chọn phương thức vận chuyển.");
      return;
    }
    if (paymentMethod === "Thanh toán VN Pay") {
      createPayment();
    }
  };

  const handleDeposit = (orderId) => {
    setLoading(true);
    const amount = totalPayment;
    try {
      fetch(
        `http://localhost:8888/api/v1/payment/vn-pay?amount=${amount}&orderId=${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          toast.success("Đặt hàng thành công!");
          window.location.href = data.paymentUrl;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      toast.error("An error occurred. Please try again later.", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const fetchPromotions = async () => {
    try {
      const res = await callGetAllPromotions();
      console.log("res", res);
      if (res && res.result) {
        setPromotions(res.result);
      }
    } catch (error) {
      toast.error("Không thể lấy danh sách khuyến mãi");
    }
  };

  const getOrderItems = () => {
    if (orders.length > 0) {
      setOrderItems(orders.map((item) => ({ ...item, selected: true })));
      let total = 0;
      orders.forEach((item) => {
        total += item.currentPrice * item.amount;
      });
      setTotalPrice(total);
    }
  };

  const calculateTotalPrice = () => {
    setTotalPayment(totalPrice - totalDiscount + totalShippingFee);
  };

  const createPayment = async () => {
    setLoading(true);
    const orderData = {
      userId: user.id,
      total: totalPayment,
      address: address,
      orderItems: orderItems.map((item) => ({
        bookId: item.id,
        quantity: item.amount,
      })),
    };
    try {
      const res = await callCreateOrder(orderData);
      if (res && res.code === 200) {
        toast.success("Đặt hàng thành công!");
        dispatch(doRemoveOrder([]));
        if (paymentMethod === "Thanh toán VN Pay") {
          console.log("====================================");
          console.log(res.result.id);
          console.log("====================================");
          handleDeposit(res.result.id);
        } else {
          alert("Đặt hàng thành công!");
        }
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item) => {
    return (
      <Row style={{ width: "100%" }} align="middle">
        <Col span={3}>
          <Image
            width={80}
            src={item.thumbnail || "https://via.placeholder.com/80"}
            alt="Product Image"
          />
        </Col>
        <Col span={9}>
          <div>
            <Text strong>{item.title}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {item.releaseDate}
            </Text>
            <br />
            <Text delete>
              {item.originalPrice
                ? (item.currentPrice * 1.11).toLocaleString()
                : ""}
              &nbsp;đ
            </Text>
            <br />
            <Text strong style={{ color: "red" }}>
              {item.currentPrice ? item.currentPrice.toLocaleString() : ""} đ
            </Text>
          </div>
        </Col>
        <Col span={6}>
          <InputNumber min={1} value={item.amount} disabled={true} />
        </Col>
        <Col span={6}>
          <Text strong style={{ color: "red" }}>
            {(item.currentPrice * item.amount).toLocaleString()} đ
          </Text>
        </Col>
      </Row>
    );
  };

  const setFormData = () => {
    if (user) {
      form.setFieldsValue({
        name: name,
        phone: phone || "",
        email: email || "",
        address: address || "",
      });
    }
  };

  useEffect(() => {
    fetchPromotions();
    setFormData();
    getOrderItems();
  }, [user]);

  useEffect(() => {
    calculateTotalPrice();
  }, [totalPrice, totalDiscount, totalShippingFee]);

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="content">
          <div className="title">
            <Text>ĐỊA CHỈ GIAO HÀNG</Text>
          </div>
          <Form
            form={form}
            name="Dia chi giao hang"
            layout="horizontal"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              className="left-align-label"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={handleNameChange}
                disabled={user ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              className="left-align-label"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={handlePhoneChange}
                disabled={user ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="left-align-label"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Nhập email"
                value={email}
                onChange={handleEmailChange}
                disabled={user ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              className="left-align-label"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={handleAddressChange}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="content">
          <div className="title">
            <Text>PHƯƠNG THỨC VẬN CHUYỂN</Text>
          </div>
          <Radio.Group
            value={shippingMethod}
            options={[
              { label: "Giao hàng tiêu chuẩn - 20000vnd", value: 20000 },
              { label: "Giao hàng nhanh - 50000vnd", value: 50000 },
            ]}
            onChange={handleShippingMethodChange}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          />
        </div>
        <div className="content">
          <div className="title">
            <Text>PHƯƠNG THỨC THANH TOÁN</Text>
          </div>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Radio value="Thanh toán khi nhận hàng">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10911"
                alt="dollar"
                style={{ float: "left", marginRight: "10px" }}
              />
              <span>Thanh toán khi nhận hàng</span>
            </Radio>
            <Radio value="Thanh toán VN Pay">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10911"
                alt="VN Pay"
                style={{ float: "left", marginRight: "10px" }}
              />
              <span>Thanh toán VN Pay</span>
            </Radio>
            <Radio value="Thanh toán Momo">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10911"
                alt="Momo"
                style={{ float: "left", marginRight: "10px" }}
              />
              <span>Thanh toán ví Momo</span>
            </Radio>
          </Radio.Group>
        </div>
        <div className="content">
          <div className="title">
            <Text>MÃ KHUYẾN MÃI/MÃ QUÀ TẶNG</Text>
          </div>
          <Form
            name="Ma khuyen mai"
            layout="horizontal"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <Form.Item
              label="Mã khuyến mãi"
              name="Mã khuyến mãi"
              className="left-align-label"
            >
              <Input
                type="Text"
                placeholder="Nhập mã khuyến mãi"
                value={promoCode}
                onChange={handlePromoCodeChange}
                addonAfter={
                  <Button
                    style={{ backgroundColor: "#2f80ed", color: "#ffff" }}
                    onClick={applyPromoCode}
                  >
                    Áp dụng
                  </Button>
                }
                style={{ width: "50%", marginRight: "10px" }}
              />
              <a
                onClick={onSelectPromotion}
                style={{ border: "none", color: "#2f80ed" }}
              >
                Chọn mã khuyến mãi
              </a>
              {promoMessage && (
                <div style={{ marginTop: 8, color: promoMessage.startsWith("✅") ? "green" : "red" }}>
                  {promoMessage}
                </div>
              )}
              <Modal
                title="CHỌN MÃ KHUYẾN MÃI"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                bodyStyle={{ maxHeight: 400, overflowY: "auto" }}
              >
                {/* <Input
                  type="Text"
                  placeholder="Nhập mã khuyến mãi"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  addonAfter={
                    <Button
                      style={{ backgroundColor: "#2f80ed", color: "#ffff" }}
                      onClick={applyPromoCode}
                    >
                      Áp dụng
                    </Button>
                  }
                /> */}
                <List
                  itemLayout="horizontal"
                  dataSource={promotions}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button
                          key="select"
                          type="primary"
                          size="small"
                          onClick={() => {
                            setPromoCode(item.code);
                            setIsModalVisible(false);
                          }}
                        >
                          Chọn
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={
                          <>
                            <div>Giảm: {item.discount}%</div>
                            <div>Điều kiện: {item.condition}</div>
                            <div>Thời gian: {item.startDate} - {item.endDate}</div>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Modal>
            </Form.Item>
          </Form>
        </div>
        <div className="content">
          <div className="title">
            <Text>KIỂM TRA LẠI ĐƠN HÀNG</Text>
          </div>
          <div className="order-items">
            {orderItems.length === 0 ? (
              <Text>Không có sản phẩm nào trong giỏ hàng</Text>
            ) : (
              <>
                <Row
                  justify="space-between"
                  align="middle"
                  className="cart-header"
                  style={{ marginBottom: "10px" }}
                >
                  <Col span={3}>
                    <Text strong>Hình ảnh</Text>
                  </Col>
                  <Col span={9}>
                    <Text strong>Sản phẩm</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>Số lượng</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>Thành tiền</Text>
                  </Col>
                </Row>
                <List
                  itemLayout="horizontal"
                  dataSource={orderItems}
                  renderItem={renderItem}
                />
              </>
            )}
          </div>
        </div>
        <div className="sticky-footer">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              width: "80%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Row style={{ gap: "50px" }}>
              <Col>
                <Text>Thành tiền: </Text>
              </Col>
              <Col>
                <Text>{formatPrice(totalPrice)}</Text>
              </Col>
            </Row>
            <Row style={{ gap: "50px" }}>
              <Col>
                <Text>Giảm giá: </Text>
              </Col>
              <Col>
                <Text>{formatPrice(totalDiscount)}</Text>
              </Col>
            </Row>
            <Row style={{ gap: "50px" }}>
              <Col>
                <Text>Phí vận chuyển: </Text>
              </Col>
              <Col>
                <Text>{formatPrice(totalShippingFee)}</Text>
              </Col>
            </Row>
            <Row style={{ gap: "50px" }}>
              <Col>
                <Text>Tổng thanh toán: </Text>
              </Col>
              <Col>
                <Text>{formatPrice(totalPayment)}</Text>
              </Col>
            </Row>
          </div>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginTop: "10px", width: "80%" }}
          >
            <Col>
              <Checkbox defaultChecked={false} onChange={(e) => setAgreed(e.target.checked)}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text>Bằng việc tiến hành Mua hàng. Bạn đã đồng ý với </Text>
                  <a href="/terms-and-conditions" style={{ color: "#2f80ed" }}>
                    Điều khoản & Điều kiện của T1&apos;s store
                  </a>
                </div>
              </Checkbox>
            </Col>
            <Col>
              <Button
                type="Text"
                size="large"
                style={{ color: "#ffff", backgroundColor: "#C92127" }}
                onClick={handleConfirmPayment}
              >
                Xác nhận thanh toán
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Payment;
