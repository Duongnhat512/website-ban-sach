import React from "react";
import { Card, Row, Col, Tag, Typography, Progress, Statistic } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import product1 from "../../assets/images/product1.png";
import "./HomePage.scss";
import ContainerHome1 from "./contanerhome1/containerhome1";
import FlashIcon from "../../assets/images/label-flashsale.svg?url";

const { Title, Text } = Typography;
const { Countdown } = Statistic;

const products = [
  {
    id: 1,
    title: "Nozaki & Truyện Tranh Thiếu Nữ - Tập 13",
    price: 24000,
    originalPrice: 48000,
    discount: 50,
    sold: 2,
    image: product1,
  },
  {
    id: 2,
    title: "Take Note - Ngữ Pháp Tiếng Anh",
    price: 37500,
    originalPrice: 75000,
    discount: 50,
    sold: 0,
    image: product1,
  },
  {
    id: 3,
    title: "Thám Tử Lừng Danh Conan - Tập 102",
    price: 20000,
    originalPrice: 25000,
    discount: 20,
    sold: 2,
    image: product1,
  },
  {
    id: 4,
    title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
    price: 154000,
    originalPrice: 200000,
    discount: 23,
    sold: 2,
    image: product1,
  },
];

const deadline = Date.now() + 1000 * 60 * 60 * 24; // 24 hours from now

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="main-container">
        <ContainerHome1 />
        <div className="flash-sale">
          <div className="flash-sale-header">
            <Title level={3} className="flash-sale-title">
              <img
                src={FlashIcon}
                alt="Flash Sale Icon"
                className="flash-icon"
              />
            </Title>
            <div className="countdown">
              Kết thúc trong <Countdown value={deadline} format="HH:mm:ss" />
            </div>
          </div>
          <Row gutter={16}>
            {products.map((product) => (
              <Col span={6} key={product.id}>
                <Card
                  hoverable
                  cover={<img alt={product.title} src={product.image} />}
                >
                  <Title level={5} className="product-title">
                    {product.title}
                  </Title>
                  <div className="price">
                    <Text className="discount-price">
                      {product.price.toLocaleString()} đ
                    </Text>
                    <Tag color="red">-{product.discount}%</Tag>
                  </div>
                  <Text delete>{product.originalPrice.toLocaleString()} đ</Text>
                  <Progress percent={product.sold * 50} showInfo={false} />
                  <Text>Đã bán {product.sold}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
