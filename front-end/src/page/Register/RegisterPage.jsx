import React, { useState, useEffect } from "react";
import { Input, Button, Form, message, DatePicker, Row, Col } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { callRegisterApi, callSendOtpApi } from "../../service/UserService";
import "./Register.scss";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCountdown]);

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
      setOtpCountdown(60);
    } catch (error) {
      message.error("Gửi OTP thất bại. Vui lòng kiểm tra lại email.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const otp = form.getFieldValue("otp");
      const formattedValues = {
        ...values,
        dob: values.dob.format("YYYY-MM-DD"),
        roleId: 2
      };
      const response = await callRegisterApi(formattedValues, otp);
      if (response && response.code === 201) {
        message.success("Đăng ký thành công!");
        window.location.href = "/login";
      } else {
        message.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      message.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="register-form bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
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
            <Input size="large" placeholder="Tên" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
          >
            <Input size="large" placeholder="Họ" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
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
            <Input.Password size="large" placeholder="Mật khẩu" prefix={<LockOutlined />} />
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
            <Input size="large" placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
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
            <Button
              block
              size="large"
              className="skip-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Đã có tài khoản? Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;