import React, { useEffect, useState } from "react";
import {
  Layout,
  Card,
  List,
  Badge,
  Tag,
  Button,
  Row,
  Col,
  Typography,
  Image,
  Rate,
  Progress,
  Spin,
} from "antd";
import "./Cateproductlist.scss";

const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

import product1 from "../../../assets/images/product1.png";
import xuHuongIcon from "../../../assets/images/xuHuongIcon.png";
import { callGetBookByCategory } from "../../../service/BookService";
import { useNavigate } from "react-router-dom";
import { callGetAllCate } from "../../../service/AdminService";

const productsByTag = {
  "Xu hướng theo ngày": [
    {
      title: "Hoa Học Trò - Số 1451",
      price: "19.000₫",
      oldPrice: "20.000₫",
      sold: 50,
      stock: 150,
      rating: 4.5,
      discount: 5,
      img: product1,
    },
    {
      title: "Storytelling - Lay Động Lòng Người",
      price: "184.500₫",
      oldPrice: "245.000₫",
      sold: 32,
      stock: 68,
      rating: 4.2,
      discount: 25,
      img: product1,
    },
    {
      title: "A Little Life",
      price: "306.900₫",
      oldPrice: "341.000₫",
      sold: 85,
      stock: 120,
      rating: 4.8,
      discount: 10,
      img: product1,
    },
    {
      title: "Combo Manga - Attack On Titan",
      price: "413.952₫",
      oldPrice: "480.000₫",
      sold: 74,
      stock: 90,
      rating: 4.6,
      discount: 13,
      img: product1,
    },
    {
      title: "Hoa Hồng Sáp Thơm",
      price: "29.700₫",
      oldPrice: "33.000₫",
      sold: 70,
      stock: 200,
      rating: 4.1,
      discount: 10,
      img: product1,
    },
  ],
  "Sách hot - Giảm Sốc": [
    {
      title: "Siêu Xe Hot Wheels",
      price: "62.100₫",
      oldPrice: "69.000₫",
      sold: 43,
      stock: 150,
      rating: 4.5,
      discount: 10,
      img: product1,
    },
    {
      title: "Hoàng Tử Bé",
      price: "59.250₫",
      oldPrice: "79.000₫",
      sold: 125,
      stock: 150,
      rating: 4.5,
      discount: 25,
      img: product1,
    },
    {
      title: "Đắc Nhân Tâm",
      price: "64.500₫",
      oldPrice: "86.000₫",
      sold: 127,
      stock: 150,
      rating: 4.5,
      discount: 25,
      img: product1,
    },
    {
      title: "Sức Mạnh Tiềm Thức",
      price: "102.400₫",
      oldPrice: "128.000₫",
      sold: 134,
      stock: 150,
      rating: 4.5,
      discount: 20,
      img: product1,
    },
    {
      title: "OSHO - Yêu",
      price: "134.400₫",
      oldPrice: "168.000₫",
      sold: 100,
      stock: 150,
      rating: 4.5,
      discount: 20,
      img: product1,
    },
  ],
  "BestSeller Ngoại Văn": [
    {
      title: "A Little Life",
      price: "306.900₫",
      oldPrice: "341.000₫",
      sold: 85,
      stock: 150,
      rating: 4.5,
      discount: 10,
      img: product1,
    },
    {
      title: "Storytelling - Lay Động Lòng Người",
      price: "184.500₫",
      oldPrice: "245.000₫",
      sold: 32,
      stock: 150,
      rating: 4.5,
      discount: 25,
      img: product1,
    },
    {
      title: "Combo Manga - Attack On Titan",
      price: "413.952₫",
      oldPrice: "480.000₫",
      sold: 74,
      stock: 150,
      rating: 4.5,
      discount: 13,
      img: product1,
    },
    {
      title: "Hoa Học Trò - Số 1451",
      price: "19.000₫",
      oldPrice: "20.000₫",
      sold: 50,
      stock: 150,
      rating: 4.5,
      discount: 5,
      img: product1,
    },
    {
      title: "Hoa Hồng Sáp Thơm",
      price: "29.700₫",
      oldPrice: "33.000₫",
      sold: 70,
      stock: 150,
      rating: 4.5,
      discount: 10,
      img: product1,
    },
    {
      title: "A Little Life",
      price: "306.900₫",
      oldPrice: "341.000₫",
      sold: 85,
      stock: 150,
      rating: 4.5,
      discount: 10,
      img: product1,
    },
    {
      title: "Storytelling - Lay Động Lòng Người",
      price: "184.500₫",
      oldPrice: "245.000₫",
      sold: 32,
      stock: 150,
      rating: 4.5,
      discount: 25,
      img: product1,
    },
    {
      title: "Combo Manga - Attack On Titan",
      price: "413.952₫",
      oldPrice: "480.000₫",
      sold: 74,
      stock: 150,
      rating: 4.5,
      discount: 13,
      img: product1,
    },
    {
      title: "Hoa Học Trò - Số 1451",
      price: "19.000₫",
      oldPrice: "20.000₫",
      sold: 50,
      stock: 150,
      rating: 4.5,
      discount: 5,
      img: product1,
    },
    {
      title: "Hoa Hồng Sáp Thơm",
      price: "29.700₫",
      oldPrice: "33.000₫",
      sold: 70,
      stock: 150,
      rating: 4.5,
      discount: 10,
      img: product1,
    },
  ],
};

const Categories = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleGetCategory = async () => {
    let res = await callGetAllCate();
    console.log("category", res);

    if (res && res.code === 200) {
      setData(res.result.result.slice(0, 8)); // Giới hạn số lượng danh mục hiển thị
    }
  };
  useEffect(() => {
    handleGetCategory();
  }, []);
  return (
    <Layout className="cate-product-list">
      <Title level={3} className="category-title">
        Danh mục sản phẩm
      </Title>
      <Row gutter={[16, 16]}>
        {data.map((category, index) => (
          <Col
            span={3}
            key={category.id}
            onClick={() =>
              navigate("/filter", {
                state: { categoryId: category.id, categoryName: category.name },
              })
            }
          >
            <div className="category-card cursor-pointer">
              <Image src={category.image} preview={false} />
              <p>{category.name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};
const ProductBook1 = () => {
  const categoriesBooks = [
    "Thiếu nhi",
    "Manga - Comic",
    "Văn học",
    "Báo - Tạp Chí",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoriesBooks[0]); // Danh mục mặc định
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [loading, setLoading] = useState(false); // State quản lý trạng thái loading
  const navigate = useNavigate();
  // Hàm gọi API để lấy sách theo danh mục
  const handleGetBooksByCategory = async (categoryName) => {
    setLoading(true); // Bắt đầu loading
    try {
      console.log("Fetching books by category:", categoryName);

      const response = await callGetBookByCategory(categoryName);
      console.log("Books by category:", response);

      if (response && response.code === 200) {
        setProducts(response.result.result);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching books by category:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBooksByCategory(selectedCategory);
  }, [selectedCategory]);
  const handleNavigateToFilter = () => {
    navigate("/filter", {
      state: { categoryName: selectedCategory },
    });
  };
  return (
    <Layout className="cate-product-list">
      <Content>
        <div className="header-product-list">
          <img
            src={xuHuongIcon}
            alt="Xu Hướng Icon"
            className="xu-huong-icon "
          />
          <h2>Sách Giải Trí & Văn Học</h2>
        </div>
        <div className="tag-container" style={{ marginBottom: "16px" }}>
          {categoriesBooks.map((category) => (
            <Tag.CheckableTag
              key={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
            >
              {category}
            </Tag.CheckableTag>
          ))}
        </div>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item>
                <Badge.Ribbon
                  text={`-${Math.round(item.discount * 100)}%`}
                  color="red"
                >
                  <Card
                    hoverable
                    cover={<Image src={item.thumbnail} alt={item.title} />}
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <Meta
                      title={item.title}
                      description={
                        <>
                          <strong>
                            {item.currentPrice.toLocaleString("vi-VN")}₫
                          </strong>
                          <del style={{ color: "#888" }}>
                            {item.originalPrice.toLocaleString("vi-VN")}₫
                          </del>
                          <div>
                            <Rate allowHalf defaultValue={item.rating || 3} />
                          </div>
                          <div className="custom-progress">
                            <Progress
                              percent={(item.sold || 100 / item.quantity) * 100}
                              showInfo={false}
                              strokeColor="#c2185b"
                              trailColor="#f1b1b0"
                              size={["100%", 15]}
                            />
                            <div className="progress-text">
                              {`Đã bán ${item.sold || 100}`}
                            </div>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              </List.Item>
            )}
          />
        )}
        <Row
          justify="center"
          style={{ marginTop: "20px" }}
          onClick={handleNavigateToFilter}
        >
          <Button type="primary">Xem Thêm</Button>
        </Row>
      </Content>
    </Layout>
  );
};
const ProductBook = () => {
  const categoriesBooks = [
    "Khoa học kỹ thuật",
    "Tâm lý - Kỹ năng sống",
    "Lịch Sử - Địa Lý - Tôn Giáo",
    "Sách học ngoại ngữ",
    "Giáo khoa - Tham khảo",
    "Nuôi Dạy Con",
    "Kinh Tế",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoriesBooks[0]); // Danh mục mặc định
  const [products, setProducts] = useState([]); // State lưu danh sách sản phẩm
  const [loading, setLoading] = useState(false); // State quản lý trạng thái loading
  const navigate = useNavigate();
  // Hàm gọi API để lấy sách theo danh mục
  const handleGetBooksByCategory = async (categoryName) => {
    setLoading(true); // Bắt đầu loading
    try {
      console.log("Fetching books by category:", categoryName);

      const response = await callGetBookByCategory(categoryName);
      console.log("Books by category:", response);

      if (response && response.code === 200) {
        setProducts(response.result.result);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching books by category:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetBooksByCategory(selectedCategory);
  }, [selectedCategory]);
  const handleNavigateToFilter = () => {
    navigate("/filter", {
      state: { categoryName: selectedCategory },
    });
  };
  return (
    <Layout className="cate-product-list">
      <Content>
        <div className="header-product-list">
          <img
            src={xuHuongIcon}
            alt="Xu Hướng Icon"
            className="xu-huong-icon "
          />
          <h2>Sách Kiến Thức & Kỹ Năng</h2>
        </div>
        <div className="tag-container" style={{ marginBottom: "16px" }}>
          {categoriesBooks.map((category) => (
            <Tag.CheckableTag
              key={category}
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
            >
              {category}
            </Tag.CheckableTag>
          ))}
        </div>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item>
                <Badge.Ribbon
                  text={`-${Math.round(item.discount * 100)}%`}
                  color="red"
                >
                  <Card
                    hoverable
                    cover={<Image src={item.thumbnail} alt={item.title} />}
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)}

                  >
                    <Meta
                      title={item.title}
                      description={
                        <>
                          <strong>
                            {item.currentPrice.toLocaleString("vi-VN")}₫
                          </strong>
                          <del style={{ color: "#888" }}>
                            {item.originalPrice.toLocaleString("vi-VN")}₫
                          </del>
                          <div>
                            <Rate allowHalf defaultValue={item.rating || 3} />
                          </div>
                          <div className="custom-progress">
                            <Progress
                              percent={(item.sold || 100 / item.quantity) * 100}
                              showInfo={false}
                              strokeColor="#c2185b"
                              trailColor="#f1b1b0"
                              size={["100%", 15]}
                            />
                            <div className="progress-text">
                              {`Đã bán ${item.sold || 100}`}
                            </div>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              </List.Item>
            )}
          />
        )}
        <Row
          justify="center"
          style={{ marginTop: "20px" }}
          onClick={handleNavigateToFilter}
        >
          <Button type="primary">Xem Thêm</Button>
        </Row>
      </Content>
    </Layout>
  );
};
const CateProductList = () => {
  return (
    <>
      <Categories />
      <ProductBook1 />
      <ProductBook />
    </>
  );
};

export default CateProductList;
