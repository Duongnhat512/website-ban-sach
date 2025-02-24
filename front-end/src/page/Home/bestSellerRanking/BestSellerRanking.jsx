import React, { useState } from "react";
import { Tabs, Card, Typography, Button, Row, Col } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import product1 from "../../../assets/images/product1.png";
import "./BestSellerRanking.scss";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const categories = ["Văn học", "Kinh tế"];

const rankingData = {
  "Văn học": [
    {
      rank: "01",
      title: "Người Đàn Ông Mang Tên OVE",
      author: "Fredrik Backman",
      publisher: "NXB Trẻ",
      price: "190.000đ",
      discount: "170.000đ",
      points: 1445,
      img: product1,
      description: "Câu chuyện cảm động về một ông lão khó tính nhưng giàu lòng nhân ái.",
    },
    {
      rank: "02",
      title: "Người Đàn Ông Mang Tên OVE",
      author: "Fredrik Backman",
      publisher: "NXB Trẻ",
      price: "190.000đ",
      discount: "170.000đ",
      points: 1445,
      img: product1,
      description: "Câu chuyện cảm động về một ông lão khó tính nhưng giàu lòng nhân ái.",
    },
  ],
  "Kinh tế": [
    {
      rank: "01",
      title: "Người Đàn Ông Mang Tên OVE",
      author: "Fredrik Backman",
      publisher: "NXB Trẻ",
      price: "190.000đ",
      discount: "170.000đ",
      points: 1445,
      img: product1,
      description: "Câu chuyện cảm động về một ông lão khó tính nhưng giàu lòng nhân ái.",
    },
  ],
};

const BestSellerRanking = () => {
  const [selectedCategory, setSelectedCategory] = useState("Văn học");
  const [selectedBook, setSelectedBook] = useState(rankingData["Văn học"][0]);

  return (
    <div className="best-seller-container">
      <Title level={3} className="ranking-title">
        📚 Bảng xếp hạng sách bán chạy tuần
      </Title>

      <Tabs
        defaultActiveKey="Văn học"
        onChange={(key) => {
          setSelectedCategory(key);
          setSelectedBook(rankingData[key][0]);
        }}
        centered
      >
        {categories.map((category) => (
          <TabPane tab={category} key={category} />
        ))}
      </Tabs>

      <Row gutter={[24, 24]}>
        <Col span={8}>
          <div className="ranking-content">
            {rankingData[selectedCategory].map((item) => (
              <Card
                className={`ranking-item ${selectedBook.rank === item.rank ? 'active' : ''}`}
                key={item.rank}
                onClick={() => setSelectedBook(item)}
              >
                <Row align="middle">
                  <Col span={3} className="rank-section">
                    <Text className="rank">{item.rank}</Text>
                    <ArrowUpOutlined className="arrow-icon" />
                  </Col>
                  <Col span={8} className="image-section">
                    <img src={item.img} alt={item.title} className="book-img" />
                  </Col>
                  <Col span={13} className="info-section">
                    <Text strong>{item.title}</Text>
                    <Text type="secondary">{item.author}</Text>
                    <Text className="points">{item.points} điểm</Text>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </Col>

        <Col span={16}>
          <Card className="highlighted-book">
            <Row>
              <Col span={10}>
                <img
                  src={selectedBook.img}
                  alt={selectedBook.title}
                  className="highlighted-img"
                />
              </Col>
              <Col span={14} className="book-details">
                <Title level={4}>{selectedBook.title}</Title>
                <Text type="secondary">Tác giả: {selectedBook.author}</Text>
                <Text>Nhà xuất bản: {selectedBook.publisher}</Text>
                <Text>
                  Giá: <span className="price">{selectedBook.price}</span>{" "}
                  <span className="discount">{selectedBook.discount}</span>
                </Text>
                <Text className="book-description">
                  {selectedBook.description}
                </Text>
                <Button type="primary" shape="round" className="buy-button">
                  Mua ngay
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <div className="ranking-footer">
        <Button color="pink" variant="outlined">
          Xem Thêm
        </Button>
      </div>
    </div>
  );
};

export default BestSellerRanking;