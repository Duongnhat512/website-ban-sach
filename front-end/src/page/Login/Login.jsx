import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Tabs } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";

const Login = ({ isOpen, onClose, onSwitch }) => {
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (isOpen) {
      setActiveKey("1"); // Đặt lại tab mặc định là "Đăng nhập" khi mở modal
    }
  }, [isOpen]);

  const handleTabChange = (key) => {
    if (key === "2") {
      onSwitch(); // Đóng login, mở register
    } else {
      setActiveKey(key);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="login-modal"
    >
      <Tabs activeKey={activeKey} centered onChange={handleTabChange}>
        <Tabs.TabPane tab="Đăng nhập" key="1">
          <div className="login-form">
            <Input
              size="large"
              placeholder="Nhập số điện thoại hoặc email"
              prefix={<MailOutlined />}
            />
            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu"
              prefix={<LockOutlined />}
            />
            <div className="forgot-password">Quên mật khẩu?</div>
            <Button type="primary" block size="large">
              Đăng nhập
            </Button>
            <Button block size="large" className="skip-btn" onClick={onClose}>
              Bỏ qua
            </Button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đăng ký" key="2">
          <p>Chuyển sang đăng ký...</p>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default Login;