import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Tabs, Form, message, DatePicker, Row, Col } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, CalendarOutlined } from "@ant-design/icons";
import { callRegisterApi, callSendOtpApi } from "../../service/UserService";
import "./Register.scss";

const Register = ({ isOpen, onClose, onSwitch }) => {
  const [activeKey, setActiveKey] = useState("2");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      setActiveKey("2"); // Đặt lại tab mặc định là "Đăng ký" khi mở modal
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCountdown]);

  const handleTabChange = (key) => {
    if (key === "1") {
      onSwitch(); // Đóng đăng ký, mở đăng nhập
    } else {
      setActiveKey(key);
    }
  };

  const handleSendOtp = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      message.error("Vui lòng nhập email trước khi gửi OTP.");
      return;
    }
    setOtpLoading(true);
    try {
      await callSendOtpApi(email);
      message.success("OTP đã được gửi đến email của bạn!");
      setOtpSent(true);
      setOtpCountdown(60); // Đặt thời gian đếm ngược 1 phút
    } catch (error) {
      message.error("Gửi OTP thất bại. Vui lòng kiểm tra lại email.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dob: values.dob.format("YYYY-MM-DD"), // Định dạng ngày sinh
      };
      const response = await callRegisterApi(formattedValues);
      message.success("Đăng ký thành công!");
      onClose();
    } catch (error) {
      message.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} centered className="register-modal">
      <Tabs activeKey={activeKey} onChange={handleTabChange} centered>
        <Tabs.TabPane tab="Đăng nhập" key="1">
          <p>Chuyển sang đăng nhập...</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đăng ký" key="2">
          <Form
            form={form}
            name="register"
            onFinish={handleRegister}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input
                size="large"
                placeholder="Tên"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
            >
              <Input
                size="large"
                placeholder="Họ"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input
                size="large"
                placeholder="Email"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="otp"
                    noStyle
                    rules={[{ required: otpSent, message: "Vui lòng nhập OTP!" }]}
                  >
                    <Input
                      size="large"
                      placeholder="Nhập OTP"
                      prefix={<LockOutlined />}
                      disabled={!otpSent}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={handleSendOtp}
                    loading={otpLoading}
                    disabled={otpCountdown > 0}
                  >
                    {otpCountdown > 0 ? `Gửi lại OTP sau ${otpCountdown}s` : "Gửi OTP"}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                size="large"
                placeholder="Mật khẩu"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="dob"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
            >
              <DatePicker
                size="large"
                placeholder="Ngày sinh"
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input
                size="large"
                placeholder="Số điện thoại"
                prefix={<PhoneOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                Đăng ký
              </Button>
            </Form.Item>
            <Form.Item>
              <Button block size="large" className="skip-btn" onClick={onClose}>
                Bỏ qua
              </Button>
            </Form.Item>
            <p className="switch-text">
              Đã có tài khoản? <Button type="link" onClick={onSwitch}>Đăng nhập</Button>
            </p>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default Register;