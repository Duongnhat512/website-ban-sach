import { Form, Input, Radio, Button, Modal, List, Row, Col, Checkbox } from "antd";
import { useEffect, useState } from "react";
import "./Payment.scss";
import { Typography } from "antd";

const { Text } = Typography;

function Payment() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [shippingMethod, setShippingMethod] = useState();
    const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");
    const [promoCode, setPromoCode] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalShippingFee, setTotalShippingFee] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [userInfo, setUserInfo] = useState({})

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    }

    const applyPromoCode = () => {
        // Handle promo code application logic here
        console.log("Promo code applied:", promoCode);
    }

    const onSelectPromotion = () => {
        setIsModalVisible(!isModalVisible);
    }

    const handleOk = () => {
        setIsModalVisible(!isModalVisible);
    }

    const handleCancel = () => {
        setIsModalVisible(!isModalVisible);
    }

    const handleShippingMethodChange = (e) => {
        setTotalShippingFee(e.target.value);
        setShippingMethod(e.target.value);
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    }

    const promotions = [
        {
            title: "Mã Giảm 10K",
            description: "Đơn hàng mua Manga/ Light Novel/ Dam Mỹ từ 120k",
            details: "HSD: 31/03/2025, Mua thêm 39.000đ",
            value: 10000,
            code: "10KOFF"
        },
        {
            title: "Mã Giảm 10K - Toàn Sàn",
            description: "Đơn hàng từ 130k - Không bao gồm giá trị của các sản phẩm sau Manga, Ngoại Văn...",
            details: "HSD: 31/03/2025, Mua thêm 130.000đ",
            value: 10000,
            code: "10KOFFALL"
        },
        {
            title: "Mã Giảm 10K",
            description: "Đơn hàng mua Manga/ Light Novel/ Dam Mỹ từ 200k",
            details: "Freeship, HSD: 31/03/2025, Mua thêm 119.000đ",
            value: 10000,
            code: "FREESHIP10K"
        },
        {
            title: "Freeship",
            description: "HSD: 31/03/2025, Mua thêm 169.000đ",
            details: "Áp dụng tối đa: 1",
            code: "FREESHIP"
        }
    ];

    const fetchUserInfo = () => {

    }

    const fetchPromotions = () => {

    }

    const fetchOrderItems = () => {

    }

    const calculateTotalPrice = () => {
        setTotalPayment(totalPrice - totalDiscount + totalShippingFee);
    }

    const createPayment = async () => {

    }

    const renderItem = (item) => {
        return (
            <></>
        )
    }

    useEffect(() => {
        fetchUserInfo();
        fetchPromotions();
        fetchOrderItems();
    }, [])

    useEffect(() => {
        calculateTotalPrice();
    }, [totalPrice, totalDiscount, totalShippingFee])

    return (
        <div className="payment">
            <div className="payment-container">
                <div className="content">
                    <div className="title">
                        <Text>ĐỊA CHỈ GIAO HÀNG</Text>
                    </div>
                    <Form
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
                            name="Họ và tên"
                            className="left-align-label"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ và tên!",
                                },
                            ]}
                        >
                            <Input type="Text" placeholder="Nhập họ và tên" value={name} onChange={handleNameChange} />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="Số điện thoại"
                            className="left-align-label"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                        >
                            <Input type="Text" placeholder="Nhập số điện thoại" value={phone} onChange={handlePhoneChange} />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="Địa chỉ"
                            className="left-align-label"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                        >
                            <Input type="Text" placeholder="Nhập địa chỉ" value={address} onChange={handleAddressChange} />
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
                        <Radio value="Thanh toán khi nhận hàng" >
                            <img src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=10911" alt="dollar" style={{ float: "left", marginRight: "10px" }} />
                            <span>Thanh toán khi nhận hàng</span>
                        </Radio>
                        <Radio value="Thanh toán VN Pay">
                            <img src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=10911" alt="VN Pay" style={{ float: "left", marginRight: "10px" }} />
                            <span>Thanh toán VN Pay</span>
                        </Radio>
                        <Radio value="Thanh toán Momo">
                            <img src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=10911" alt="Momo" style={{ float: "left", marginRight: "10px" }} />
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
                                addonAfter={<Button style={{ backgroundColor: "#2f80ed", color: "#ffff" }} onClick={applyPromoCode}>Áp dụng</Button>}
                                style={{ width: "50%", marginRight: "10px" }}
                            />
                            <a onClick={onSelectPromotion} style={{ border: "none", color: "#2f80ed" }}>
                                Chọn mã khuyến mãi
                            </a>
                            <Modal
                                title="CHỌN MÃ KHUYẾN MÃI"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <Input
                                    type="Text"
                                    placeholder="Nhập mã khuyến mãi"
                                    value={promoCode}
                                    onChange={handlePromoCodeChange}
                                    addonAfter={<Button style={{ backgroundColor: "#2f80ed", color: "#ffff" }} onClick={applyPromoCode}>Áp dụng</Button>}
                                />
                                <List
                                    itemLayout="horizontal"
                                    dataSource={promotions}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={
                                                    <>
                                                        <div>{item.description}</div>
                                                        {item.details && <div>{item.details}</div>}
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
                    <List
                        itemLayout="horizontal"
                        dataSource={orderItems}
                        renderItem={renderItem}
                    />
                </div>
                <div className="sticky-footer">
                    <div style={{ display: "flex", alignItems: "flex-end", width: "80%", flexDirection: "column", gap: "10px" }}>
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
                    <Row justify="space-between" align="middle" style={{ marginTop: "10px", width: "80%" }}>
                        <Col>
                            <Checkbox
                                defaultChecked={false}

                            >
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Text>Bằng việc tiến hành Mua hàng. Bạn đã đồng ý với </Text>
                                    <a href="/terms-and-conditions" style={{ color: "#2f80ed" }}>Điều khoản & Điều kiện của T1&apos;s store</a>
                                </div>
                            </Checkbox>

                        </Col>
                        <Col>
                            <Button type="Text" size="large" style={{ color: "#ffff", backgroundColor: "#C92127" }}>Xác nhận thanh toán</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Payment;