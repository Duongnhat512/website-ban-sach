import React from "react";
import {
  Layout,
  Menu,
  Input,
  Dropdown,
  Space,
  Image,
  Row,
  Col,
  Button,
  Popover,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaBars } from "react-icons/fa";
import Banner from "../../assets/images/banner.png";
import Logo from "../../assets/images/logo.png";
import "./Header.scss";
import { useState } from "react";
import Login from "../../page/Login/Login";
import Register from "../../page/Register/Register";
import { useDispatch, useSelector } from "react-redux";


const { Header } = Layout;

const categories = [
  {
    name: "Sách Trong Nước",
    header: "Các dòng sách phổ biến",
    content: [
      {
        title: "Văn Học",
        options: ["Tiểu thuyết", "Truyện ngắn", "Thơ ca", "Tản văn"],
      },
      {
        title: "Kinh Tế",
        options: ["Tài chính", "Quản trị", "Marketing", "Khởi nghiệp"],
      },
      {
        title: "Kỹ Năng Sống",
        options: ["Phát triển bản thân", "Tư duy", "Giao tiếp", "Lãnh đạo"],
      },
      {
        title: "Thiếu Nhi",
        options: ["Truyện tranh", "Sách giáo dục", "Cổ tích", "Khoa học"],
      },
    ],
  },
  {
    name: "FOREIGN BOOKS",
    header: "Popular Book Categories",
    content: [
      {
        title: "Fiction",
        options: ["Novels", "Short stories", "Classics", "Fantasy"],
      },
      {
        title: "Business",
        options: ["Finance", "Marketing", "Management", "Entrepreneurship"],
      },
      {
        title: "Self-help",
        options: ["Personal growth", "Psychology", "Mindfulness", "Success"],
      },
      {
        title: "Children",
        options: ["Storybooks", "Educational", "Comics", "Science"],
      },
    ],
  },
  {
    name: "VPP - Dụng Cụ Học Sinh",
    header: "Dụng cụ học tập phổ biến",
    content: [
      {
        title: "Bút Viết",
        options: ["Bút bi", "Bút chì", "Bút màu", "Bút lông"],
      },
      {
        title: "Sổ Tay",
        options: ["Sổ ghi chép", "Vở học sinh", "Planner", "Sổ tay nhỏ"],
      },
      {
        title: "Dụng Cụ Học Tập",
        options: ["Thước", "Gôm", "Compa", "Keo dán"],
      },
    ],
  },
  {
    name: "Đồ Chơi",
    header: "Danh mục đồ chơi",
    content: [
      {
        title: "Đồ Chơi Giáo Dục",
        options: ["Lego", "Cờ vua", "Rubik", "Flashcard"],
      },
      {
        title: "Đồ Chơi Sáng Tạo",
        options: ["Đất nặn", "Xếp hình", "Vẽ tranh", "Thủ công"],
      },
      {
        title: "Mô Hình & Nhân Vật",
        options: ["Siêu nhân", "Búp bê", "Ô tô mô hình", "Robot"],
      },
    ],
  },
  {
    name: "Làm Đẹp - Sức Khỏe",
    header: "Các sản phẩm làm đẹp",
    content: [
      {
        title: "Chăm Sóc Da",
        options: ["Sữa rửa mặt", "Kem dưỡng", "Mặt nạ", "Tẩy tế bào chết"],
      },
      {
        title: "Trang Điểm",
        options: ["Son môi", "Phấn phủ", "Kẻ mắt", "Mascara"],
      },
      {
        title: "Dụng Cụ Làm Đẹp",
        options: ["Máy rửa mặt", "Cọ trang điểm", "Gương LED", "Máy uốn tóc"],
      },
    ],
  },
  {
    name: "Hành Trang Đến Trường",
    header: "Phụ kiện đi học cần có",
    content: [
      {
        title: "Balo - Cặp Sách",
        options: ["Balo học sinh", "Túi xách", "Cặp da", "Cặp kéo"],
      },
      {
        title: "Bình Nước - Hộp Cơm",
        options: ["Bình giữ nhiệt", "Hộp đựng cơm", "Ly nhựa", "Hộp sữa"],
      },
      {
        title: "Đồng Phục - Phụ Kiện",
        options: ["Áo đồng phục", "Khăn quàng", "Thắt lưng", "Mũ nón"],
      },
    ],
  },
  {
    name: "VPP - DCHS Theo Thương Hiệu",
    header: "Thương hiệu VPP phổ biến",
    content: [
      {
        title: "Thiên Long",
        options: ["Bút bi", "Bút chì", "Vở học sinh", "Dụng cụ vẽ"],
      },
      {
        title: "Hồng Hà",
        options: ["Sổ tay", "Bút viết", "Dụng cụ văn phòng", "Giấy note"],
      },
      {
        title: "Deli",
        options: ["Bấm kim", "Ghim giấy", "Tập hồ sơ", "Dao rọc giấy"],
      },
    ],
  },
  {
    name: "Đồ Chơi Theo Thương Hiệu",
    header: "Thương hiệu đồ chơi nổi bật",
    content: [
      {
        title: "Lego",
        options: [
          "Lego City",
          "Lego Friends",
          "Lego Technic",
          "Lego Star Wars",
        ],
      },
      {
        title: "Fisher-Price",
        options: ["Đồ chơi bé", "Ghế nhún", "Xe tập đi", "Thú nhồi bông"],
      },
      {
        title: "Barbie",
        options: [
          "Búp bê",
          "Mô hình thời trang",
          "Phụ kiện Barbie",
          "Xe Barbie",
        ],
      },
    ],
  },
  {
    name: "Bách Hóa Online - Lưu Niệm",
    header: "Mặt hàng phổ biến",
    content: [
      {
        title: "Đồ Gia Dụng",
        options: ["Đèn ngủ", "Hộp đựng đồ", "Giá treo", "Kệ sách mini"],
      },
      {
        title: "Quà Tặng",
        options: ["Khung ảnh", "Sổ lưu niệm", "Hoa giả", "Gấu bông"],
      },
      {
        title: "Đồ Handmade",
        options: [
          "Trang trí nhà cửa",
          "Phụ kiện handmade",
          "Đồ thủ công",
          "Nến thơm",
        ],
      },
    ],
  },
];

const AppHeader = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [username, setUsername] = useState("User");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.authenticated);

  const showLoginModal = () => {
    setIsLoginOpen(true);
  };

  const showRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const handleCancel = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const accountMenu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" onClick={showLoginModal}>
          Đăng nhập
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" onClick={showRegisterModal}>
          Đăng ký
        </Button>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link">Thông tin cá nhân</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link">Lịch sử mua hàng</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="link" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );



  return (
    <Layout className="header-container">
      <div className="banner">
        <Image width={1200} src={Banner} />
      </div>
      <div className="header">
        <Header className="header-content">
          <Row style={{ width: "100%", height: "100%" }}>
            <Col span={5} className="left-section">
              <img src={Logo} alt="Logo" className="logo" />
            </Col>
            <Col span={13} className="center-section">
              <Popover
                content={
                  <div className="popover-container">
                    <div className="menu-left">
                      <h3>Danh mục sản phẩm</h3>
                      <ul>
                        {categories.map((category) => (
                          <li
                            key={category.name}
                            className={
                              selectedCategory.name === category.name
                                ? "active"
                                : ""
                            }
                            onMouseEnter={() => setSelectedCategory(category)}
                          >
                            {category.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="menu-right">
                      <h4 className="menu-header">{selectedCategory.header}</h4>
                      <Row gutter={[16, 16]}>
                        {selectedCategory.content.map((col, index) => (
                          <Col key={index} span={12}>
                            <h5 className="menu-title">{col.title}</h5>
                            <ul className="menu-options">
                              {col.options.map((option, i) => (
                                <li key={i} className="menu-option">
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                }
                trigger="hover"
                placement="bottomLeft"
              >
                <a className="menu-trigger">
                  <Space>
                    <FaBars className="menu-icon" />
                    <DownOutlined className="menu-icon" />
                  </Space>
                </a>
              </Popover>

              <Input
                placeholder="Search"
                className="search-input"
                suffix={
                  <Button
                    style={{ backgroundColor: "#c12530" }}
                    icon={<SearchOutlined style={{ color: "#fff" }} />}
                    className="search-button"
                  />
                }
              />
            </Col>
            <Col span={6} className="right-section">
              <div className="icon-section">
                <BellOutlined className="icon" />
                <p>Thông báo</p>
              </div>
              <div className="icon-section">
                <ShoppingCartOutlined className="icon" />
                <p>Giỏ hàng</p>
              </div>
              <Dropdown
                overlay={isLoggedIn ? userMenu : accountMenu}
                trigger={["hover"]}
              >
                <div className="icon-section">
                  <UserOutlined className="icon" />
                  <p>{isLoggedIn ? `Xin chào, ${username}` : "Tài khoản"}</p>
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Header>
      </div>
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitch={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitch={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </Layout>
  );
};

export default AppHeader;