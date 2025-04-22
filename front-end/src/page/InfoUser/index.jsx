import { useEffect, useState } from "react";
import { Input, Button, Radio, Card, Menu } from "antd";
import { Row, Col } from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import Suggest from "../../component/Suggest/Suggest";
import HistoryOrder from "./HistoryOrder";
const UserInfo = () => {
  const isLoggedIn = useSelector((state) => state.user.authenticated);
  const user = useSelector((state) => state.user.user);
  const [selectedKey, setSelectedKey] = useState("profile");

  const renderContent = () => {
    switch (selectedKey) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <Input
                placeholder="Nhập họ và tên"
                defaultValue={user?.fullName || ""}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <Input
                placeholder="Nhập số điện thoại"
                defaultValue={user?.phoneNumber || ""}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                placeholder="Nhập email"
                defaultValue={user?.email || ""}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới tính
              </label>
              <Radio.Group
                defaultValue={user?.gender || null}
                className="flex gap-4"
              >
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
              </Radio.Group>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="DD"
                  defaultValue={user?.dob ? user.dob.split("-")[2] : ""}
                  className="p-2 border border-gray-300 rounded-md w-1/3"
                />
                <Input
                  placeholder="MM"
                  defaultValue={user?.dob ? user.dob.split("-")[1] : ""}
                  className="p-2 border border-gray-300 rounded-md w-1/3"
                />
                <Input
                  placeholder="YYYY"
                  defaultValue={user?.dob ? user.dob.split("-")[0] : ""}
                  className="p-2 border border-gray-300 rounded-md w-1/3"
                />
              </div>
            </div>
            <Button
              type="primary"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Lưu thay đổi
            </Button>
          </div>
        );
      case "address":
        return (
          <div className="space-y-6">
            {/* Form địa chỉ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ
              </label>
              <Input
                placeholder="Nhập họ"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên
              </label>
              <Input
                placeholder="Nhập tên"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <Input
                placeholder="Nhập số điện thoại"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <Input.TextArea
                placeholder="Nhập địa chỉ"
                rows={4}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <Button
              type="primary"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Lưu địa chỉ
            </Button>
          </div>
        );
      case "password":
        return (
          <div className="space-y-6">
            {/* Mật khẩu hiện tại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu hiện tại
              </label>
              <Input.Password
                placeholder="Nhập mật khẩu hiện tại"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Mật khẩu mới */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới
              </label>
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Nhập lại mật khẩu mới */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhập lại mật khẩu mới
              </label>
              <Input.Password
                placeholder="Nhập lại mật khẩu mới"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Nút lưu */}
            <Button
              type="primary"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Đổi mật khẩu
            </Button>
          </div>
        );
      case "order":
        return (
          <HistoryOrder /> // Gọi component HistoryOrder ở đây
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/"; // Redirect to login page if not logged in
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-gray-100">
      <div className="flex justify-center bg-gray-100 py-10">
        <div className="max-w-screen-xl w-full mx-auto rounded-lg">
          <Row gutter={[16, 16]} className="h-full flex items-stretch ">
            {/* Sidebar */}
            <Col
              span={7}
              className="p-4 bg-white h-full flex flex-col rounded-lg"
            >
              <h2 className="text-lg font-semibold mb-4">
                Thông tin tài khoản
              </h2>
              <Menu
                mode="vertical"
                selectedKeys={[selectedKey]}
                onClick={(e) => setSelectedKey(e.key)}
              >
                <Menu.Item key="profile">Hồ sơ cá nhân</Menu.Item>
                <Menu.Item key="address">Số địa chỉ</Menu.Item>
                <Menu.Item key="password">Đổi mật khẩu</Menu.Item>
                <Menu.Item key="order">Đơn hàng của tôi</Menu.Item>
              </Menu>
            </Col>

            {/* Main Content */}
            <Col
              span={16}
              offset={1}
              className="bg-white h-full flex flex-col p-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold mb-4">
                {selectedKey === "profile" && "Hồ sơ cá nhân"}
                {selectedKey === "address" && "Địa chỉ của tôi"}
                {selectedKey === "password" && "Thay đổi mật khẩu"}
                {selectedKey === "order" && "Hồ sơ đặt hàng"}
              </h2>
              {renderContent()}
            </Col>
          </Row>
        </div>
      </div>
      <Suggest />
    </div>
  );
};

export default UserInfo;
