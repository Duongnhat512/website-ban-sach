import { useEffect, useState } from "react";
import { Input, Button, Radio, Card, Menu, message } from "antd";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Suggest from "../../component/Suggest/Suggest";
import HistoryOrder from "./HistoryOrder";
import { callUpdateUser } from "../../service/UserService";
const UserInfo = () => {
  const isLoggedIn = useSelector((state) => state.user.authenticated);
  const user = useSelector((state) => state.user.user);
  const [selectedKey, setSelectedKey] = useState("profile");
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    dob: user?.dob || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      dob: user?.dob || "",
      phoneNumber: user?.phoneNumber || "",
    });
    setIsChanged(false);
  }, [user]);

  // Kiểm tra thay đổi
  const handleChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    setIsChanged(
      newForm.firstName !== (user?.firstName || "") ||
      newForm.lastName !== (user?.lastName || "") ||
      newForm.email !== (user?.email || "") ||
      newForm.dob !== (user?.dob || "") ||
      newForm.phoneNumber !== (user?.phoneNumber || "")
    );
  };
  const isValidDate = (dateString) => {
    // Kiểm tra đúng định dạng trước
    if (!regex.dob.test(dateString)) return false;
    const date = new Date(dateString);
    // Kiểm tra ngày hợp lệ và đúng với input (tránh auto chuyển sang tháng tiếp theo)
    return (
      date instanceof Date &&
      !isNaN(date) &&
      date.toISOString().slice(0, 10) === dateString
    );
  };
  const regex = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^(0|\+84)[0-9]{9,10}$/,
    dob: /^\d{4}-\d{2}-\d{2}$/,
    name: /^[a-zA-ZÀ-ỹ\s']{1,50}$/i
  };

  const validateForm = () => {
    if (!regex.name.test(form.firstName)) {
      message.error("Họ không hợp lệ!");
      return false;
    }
    if (!regex.name.test(form.lastName)) {
      message.error("Tên không hợp lệ!");
      return false;
    }
    if (!regex.email.test(form.email)) {
      message.error("Email không hợp lệ!");
      return false;
    }
    if (!isValidDate(form.dob)) {
      message.error("Ngày sinh không hợp lệ!");
      return false;
    }
    if (!regex.phone.test(form.phoneNumber)) {
      message.error("Số điện thoại không hợp lệ!");
      return false;
    }
    return true;
  };
  const handleUpdate = async () => {
    if (!validateForm()) return;
    setLoadingUpdate(true);
    try {
      let res = await callUpdateUser(user.id, form);
      if (res && res.code === 200) {
        message.success("Cập nhật thành công!");
        setIsChanged(false);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      message.error("Cập nhật thất bại!");
    } finally {
      setLoadingUpdate(false);
    }
  };
  const renderContent = () => {
    switch (selectedKey) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ
              </label>
              <Input
                placeholder="Nhập họ"
                value={form.firstName}
                onChange={e => handleChange("firstName", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên
              </label>
              <Input
                placeholder="Nhập tên"
                value={form.lastName}
                onChange={e => handleChange("lastName", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                placeholder="Nhập email"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              <Input
                placeholder="YYYY-MM-DD"
                type="date"
                value={form.dob}
                onChange={e => handleChange("dob", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <Input
                placeholder="Nhập số điện thoại"
                value={form.phoneNumber}
                onChange={e => handleChange("phoneNumber", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <Button
              type="primary"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
              onClick={handleUpdate}
              disabled={!isChanged || loadingUpdate}
              loading={loadingUpdate}
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
                {/* <Menu.Item key="password">Đổi mật khẩu</Menu.Item> */}
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
