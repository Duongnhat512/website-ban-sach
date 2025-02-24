import React, { useState } from "react";
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
} from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import "./cateproductlist.scss";

const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

import Cate1 from "../../../assets/images/cate1.png";
import Cate2 from "../../../assets/images/cate2.png";
import Cate3 from "../../../assets/images/cate3.png";
import Cate4 from "../../../assets/images/cate4.png";
import Cate5 from "../../../assets/images/cate5.png";
import Cate6 from "../../../assets/images/cate6.png";
import Cate7 from "../../../assets/images/cate7.png";
import Cate9 from "../../../assets/images/cate9.png";
import product1 from "../../../assets/images/product1.png";
import xuHuongIcon from "../../../assets/images/xuHuongIcon.png";
const categories = [
  { name: "Card Game", image: Cate1 },
  { name: "Đồ Chơi Mô Hình", image: Cate2 },
  { name: "Đèn Chống Cận", image: Cate3 },
  { name: "Đam Mỹ", image: Cate4 },
  { name: "Kinh Tế", image: Cate5 },
  { name: "Văn Học", image: Cate6 },
  { name: "Tâm Lý Kỹ Năng", image: Cate7 },
  { name: "Thiếu Nhi", image: Cate9 },
];

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
const productBook = {
  "Sách Tham Khảo": [
    {
      title: "Bảng Cửu Chương - Bảng Chia",
      price: "8.000₫",
      oldPrice: "10.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 20,
      img: product1,
    },
    {
      title:"Hướng Dẫn Ôn Thi Vào Lớp 10 - Môn Tiếng Anh (Theo Định Hướng Phát Triển Năng Lực)",
      price: "42.500₫",
      oldPrice: "50.000₫",
      sold: 46,
      stock: 100,
      rating: 4.5,
      discount: 15,
      img: product1,
    },
    {
      title: "Bồi Dưỡng Năng Lực Tự Học Toán 6",
      price: "62.300₫",
      oldPrice: "89.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 20,
      img: product1,
    },
    {
      title: "Vở Luyện Viết Lớp 1 - Tập 2 (Bộ Sách: Chân Trời Sáng Tạo)",
      price: "21.000₫",
      oldPrice: "30.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 30,
      img: product1,
    },
    {
      title: "Tổng Ôn Toán 9 - Tập 2",
      price: "139.000₫",
      oldPrice: "200.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 30,
      img: product1,
    },
  ],
  "Luyện Thi THPT QG": [
    {
      title: "Bảng Cửu Chương - Bảng Chia",
      price: "8.000₫",
      oldPrice: "10.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 20,
      img: product1,
    },
    {
      title: "Hướng Dẫn Ôn Thi Vào Lớp 10 - Môn Tiếng Anh (Theo Định Hướng Phát Triển Năng Lực)",
      price: "42.500₫",
      oldPrice: "50.000₫",
      sold: 46,
      stock: 100,
      rating: 4.5,
      discount: 15,
      img: product1,
    },
    {
      title: "Bồi Dưỡng Năng Lực Tự Học Toán 6",
      price: "62.300₫",
      oldPrice: "89.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 20,
      img: product1,
    },
    {
      title: "Vở Luyện Viết Lớp 1 - Tập 2 (Bộ Sách: Chân Trời Sáng Tạo)",
      price: "21.000₫",
      oldPrice: "30.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 30,
      img: product1,
    },
    {
      title: "Tổng Ôn Toán 9 - Tập 2",
      price: "139.000₫",
      oldPrice: "200.000₫",
      sold: 500,
      stock: 1200,
      rating: 4.5,
      discount: 30,
      img: product1,
    },
  ],
};
const Categories = () => (
  <Layout className="cate-product-list">
    <Title level={3} className="category-title">
      Danh mục sản phẩm
    </Title>
    <Row gutter={[16, 16]}>
      {categories.map((category, index) => (
        <Col span={3} key={index}>
          <div className="category-card">
            <Image src={category.image} preview={false} />
            <p>{category.name}</p>
          </div>
        </Col>
      ))}
    </Row>
  </Layout>
);

const ProductList = () => {
  const [selectedTag, setSelectedTag] = useState("Xu hướng theo ngày");
  const products = productsByTag[selectedTag];

  return (
    <Layout className="cate-product-list">
      <Content>
        <div className="header-product-list">
          <img
            src={xuHuongIcon}
            alt="Xu Hướng Icon"
            className="xu-huong-icon"
          />
          <h2>Xu Hướng Mua Sắm</h2>
        </div>
        <div className="tag-container" style={{ marginBottom: "16px" }}>
          <Tag.CheckableTag
            checked={selectedTag === "Xu hướng theo ngày"}
            onChange={() => setSelectedTag("Xu hướng theo ngày")}
          >
            Xu hướng theo ngày
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={selectedTag === "Sách hot - Giảm Sốc"}
            onChange={() => setSelectedTag("Sách hot - Giảm Sốc")}
          >
            Sách hot - Giảm Sốc
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={selectedTag === "BestSeller Ngoại Văn"}
            onChange={() => setSelectedTag("BestSeller Ngoại Văn")}
          >
            BestSeller Ngoại Văn
          </Tag.CheckableTag>
        </div>
        <List
          grid={{ gutter: 16, column: 5 }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Badge.Ribbon text={`-${item.discount}%`} color="red">
                <Card
                  hoverable
                  cover={<Image src={item.img} alt={item.title} />}
                >
                  <Meta
                    title={item.title}
                    description={
                      <>
                        <strong>{item.price}</strong>
                        <del style={{ color: "#888" }}>{item.oldPrice}</del>
                        <div>
                          <Rate allowHalf defaultValue={item.rating} />
                        </div>
                        <div className="custom-progress">
                          <Progress
                            percent={(item.sold / item.stock) * 100}
                            showInfo={false}
                            strokeColor="#c2185b"
                            trailColor="#f1b1b0" // Màu nền (mờ)
                            size={["100%", 15]}
                          />
                          <div className="progress-text">
                            {`Đã bán ${item.sold}`}
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
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Button type="primary">Xem Thêm</Button>
        </Row>
      </Content>
    </Layout>
  );
};
const ProductBook = () => {
    const [selectedBook, setSelectedBook] = useState("Sách Tham Khảo");
    const products = productBook[selectedBook];
  
    return (
      <Layout className="cate-product-list">
        <Content>
          <div className="tag-container" style={{ marginBottom: "16px" }}>
            <Tag.CheckableTag
              checked={selectedBook === "Sách Tham Khảo"}
              onChange={() => setSelectedBook("Sách Tham Khảo")}
            >
              Xu hướng theo ngày
            </Tag.CheckableTag>
            <Tag.CheckableTag
              checked={selectedBook === "Luyện Thi THPT QG"}
              onChange={() => setSelectedBook("Luyện Thi THPT QG")}
            >
              Luyện Thi THPT QG
            </Tag.CheckableTag>
          </div>
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={products}
            renderItem={(item) => (
              <List.Item>
                <Badge.Ribbon text={`-${item.discount}%`} color="red">
                  <Card
                    hoverable
                    cover={<Image src={item.img} alt={item.title} />}
                  >
                    <Meta
                      title={item.title}
                      description={
                        <>
                          <strong>{item.price}</strong>
                          <del style={{ color: "#888" }}>{item.oldPrice}</del>
                          <div>
                            <Rate allowHalf defaultValue={item.rating} />
                          </div>
                          <div className="custom-progress">
                            <Progress
                              percent={(item.sold / item.stock) * 100}
                              showInfo={false}
                              strokeColor="#c2185b"
                              trailColor="#f1b1b0" // Màu nền (mờ)
                              size={["100%", 15]}
                            />
                            <div className="progress-text">
                              {`Đã bán ${item.sold}`}
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
          <Row justify="center" style={{ marginTop: "20px" }}>
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
      <ProductList />
      <ProductBook />
    </>
  );
};

export default CateProductList;
