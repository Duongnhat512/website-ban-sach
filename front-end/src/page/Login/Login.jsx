import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Tabs, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { callLoginApi, callGetUserToken } from "../../service/UserService";
import { loginSuccess, setUser } from "../../redux/UserSlice";
import "./Login.scss";
import { setAuthToken } from "../../until/customize-axios";

const Login = ({ isOpen, onClose, onSwitch }) => {
  const [activeKey, setActiveKey] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await callLoginApi(email, password);
      message.success("Đăng nhập thành công!");
      localStorage.setItem("token", response.result.token);
      setAuthToken(response.result.token);
      const userResponse = await callGetUserToken();
      dispatch(setUser(userResponse.result));
      // Xử lý logic sau khi đăng nhập thành công, ví dụ: lưu token, chuyển hướng trang, v.v.
      onClose();
    } catch (error) {
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
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
            <div className="forgot-password">Quên mật khẩu?</div>
            <Button
              type="primary"
              block
              size="large"
              onClick={handleLogin}
              loading={loading}
              disabled={!email || !password}
            >
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