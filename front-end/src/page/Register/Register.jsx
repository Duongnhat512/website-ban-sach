import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Tabs } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./Register.scss";

const Register = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeKey, setActiveKey] = useState("2");

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

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} centered className="register-modal">
      <Tabs activeKey={activeKey} onChange={handleTabChange} centered>
        <Tabs.TabPane tab="Đăng nhập" key="1">
          <p>Chuyển sang đăng nhập...</p>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đăng ký" key="2">
          <div className="register-form">
            <Input
              size="large"
              placeholder="Nhập email"
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="primary" block size="large" disabled={!email || !password}>
              Đăng ký
            </Button>
            <Button block size="large" className="skip-btn" onClick={onClose}>
              Bỏ qua
            </Button>
            <p className="switch-text">
              Đã có tài khoản? <Button type="link" onClick={onSwitch}>Đăng nhập</Button>
            </p>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default Register;