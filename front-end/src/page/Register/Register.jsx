import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Tabs, Form, message, DatePicker } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, CalendarOutlined } from "@ant-design/icons";
import { callRegisterApi } from "../../service/UserService";
import "./Register.scss";
// import moment from "moment";

const Register = ({ isOpen, onClose, onSwitch }) => {
  const [activeKey, setActiveKey] = useState("2");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveKey("2"); // Đặt lại tab mặc định là "Đăng ký" khi mở modal
    }
  }, [isOpen]);

  const handleTabChange = (key) => {
    if (key === "1") {
      onSwitch(); // Đóng đăng ký, mở đăng nhập
    } else {
      setActiveKey(key);
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
                prefix={<CalendarOutlined />}
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