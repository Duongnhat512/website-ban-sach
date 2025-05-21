import { useState } from "react";
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
  message,
  Badge,
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
import { useDispatch, useSelector } from "react-redux";
import { callLogOut } from "../../service/UserService";
import { logout } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import Login from "../../page/Login/Login";
import Register from "../../page/Register/Register";
import "./Header.scss"; // Import Tailwind CSS
import { setAuthToken } from "../../until/customize-axios";
import { callGetBookFilter } from "../../service/BookService";
import { useRef } from "react";
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
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.authenticated);
  const role = useSelector((state) => state.user.role);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const inputRef = useRef(null);
  const username = useSelector(
    (state) => state.user?.user?.fullName?.split(" ")[0] || ""
  );
  const ordersLength = useSelector((state) => state.order.orders.length || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showLoginModal = () => {
    setIsLoginOpen(true);
  };

  const showRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const handleLogout = async () => {
    let res = await callLogOut();
    if (res && res.code === 200) {
      dispatch(logout());
      localStorage.removeItem("token");
      message.success("Đăng xuất thành công!");
      setAuthToken(null);
      navigate("/");
    } else {
      message.error("Đăng xuất thất bại!");
    }
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
        <Button type="link" onClick={() => navigate("/info")}>
          Thông tin cá nhân
        </Button>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate("/history")}>
        <Button type="link">Lịch sử mua hàng</Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="link" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Menu.Item>
      {role === "ADMIN" && (
        <Menu.Item key="4">
          <Button type="link" onClick={() => navigate("/admin")}>
            Quản lý Admin
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
  const handleSearchBook = async () => {

    let search = ""
    if (searchValue) {
      search = "title:" + searchValue
    }
    let res = await callGetBookFilter(1, 10, "id:desc", search);
    console.log(res);

    if (res && res.code === 200) {
      setSearchResults(res.result.result);
      setShowResults(true);
    }
  }
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBook();
    }
  };

  const handleResultClick = (id) => {
    setShowResults(false);
    setSearchValue("");
    setSearchResults([]);
    navigate(`/product/${id}`);
  };
  return (
    <Layout className="bg-white shadow-md">
      <div className="bg-red-700 flex items-center justify-center h-20 w-full" >
        <Image width={1280} src={Banner} />
      </div>
      <div className="max-w-[1280px] w-full mx-auto h-16 px-4">
        <Header className="flex justify-between items-center bg-white p-0 h-full">
          <Row className="w-full h-full">
            <Col span={5} className="cursor-pointer flex items-center h-full gap-5 px-5">
              <img onClick={() => navigate("/")} src={Logo} alt="Logo" className="h-10 mr-5" />
            </Col>
            <Col span={13} className="flex items-center gap-2 relative">
              {/* <Popover
                content={
                  <div className="flex p-4 w-200">
                    <div className="w-1/3 p-3 border-r border-gray-300">
                      <h3 className="text-lg font-semibold mb-2">
                        Danh mục sản phẩm
                      </h3>
                      <ul className="list-none p-0 m-0">
                        {categories.map((category) => (
                          <li
                            key={category.name}
                            className={`p-2 cursor-pointer text-base transition-colors duration-200 ${selectedCategory.name === category.name
                              ? "bg-gray-300 font-bold"
                              : ""
                              }`}
                            onMouseEnter={() => setSelectedCategory(category)}
                          >
                            {category.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-2/3 p-3">
                      <h4 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1">
                        {selectedCategory.header}
                      </h4>
                      <Row gutter={[16, 16]}>
                        {selectedCategory.content.map((col, index) => (
                          <Col key={index} span={12}>
                            <h5 className="text-base font-semibold mb-1">
                              {col.title}
                            </h5>
                            <ul className="list-none p-0 m-0">
                              {col.options.map((option, i) => (
                                <li
                                  key={i}
                                  className="text-sm py-1 text-gray-600 cursor-pointer transition-colors duration-200 hover:text-gray-800"
                                >
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
                <a className="flex items-center cursor-pointer">
                  <Space>
                    <FaBars className="text-lg" />
                    <DownOutlined className="text-lg" />
                  </Space>
                </a>
              </Popover> */}

              <div className="w-full relative">
                <Input
                  ref={inputRef}
                  placeholder="Search"
                  className="w-full bg-white"
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
                  suffix={
                    <Button
                      style={{ backgroundColor: "#c12530" }}
                      icon={<SearchOutlined style={{ color: "#fff" }} />}
                      className="bg-red-700 border-none"
                      onClick={handleSearchBook}
                    />
                  }
                />
                {showResults && (
                  <div
                    className="absolute left-0 right-0 z-50 bg-white border border-gray-300 rounded shadow-md w-full max-h-80 overflow-y-auto"
                    style={{
                      top: "100%",
                      marginTop: 4,
                    }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleResultClick(item.id)}
                        >
                          <img src={item.thumbnail} alt={item.title} className="w-10 h-10 object-cover rounded" />
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-gray-500">{item.author}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500">Không tìm thấy sản phẩm</div>
                    )}
                  </div>
                )}
              </div>
            </Col>
            <Col
              span={6}
              className="flex items-center justify-between gap-5 px-5"
            >
              <div className="flex flex-col items-center text-center cursor-pointer">
                <BellOutlined className="text-xl" />
                <p className="text-xs text-black leading-tight">Thông báo</p>
              </div>
              <div
                className="flex flex-col items-center text-center cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <Badge count={ordersLength} showZero>
                  <ShoppingCartOutlined className="text-xl" />
                  <p className="text-xs text-black leading-tight">Giỏ hàng</p>
                </Badge>
              </div>
              <Dropdown
                overlay={isLoggedIn ? userMenu : accountMenu}
                trigger={["hover"]}
              >
                <div className="flex flex-col items-center text-center cursor-pointer">
                  <UserOutlined className="text-xl" />
                  <p className="text-xs text-black leading-tight">
                    {isLoggedIn ? `Xin chào, ${username}` : "Tài khoản"}
                  </p>
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
