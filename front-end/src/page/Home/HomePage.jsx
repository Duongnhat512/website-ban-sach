import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Tag,
  Typography,
  Progress,
  Statistic,
  Image,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import product1 from "../../assets/images/product1.png";
import "./HomePage.scss";
import ContainerHome1 from "./contanerhome1/containerhome1";
import FlashIcon from "../../assets/images/label-flashsale.svg?url";
import CateProductList from "./cateproductlist/cateproductlist";
import BestSellerRanking from "./bestSellerRanking/bestSellerRanking";
import { callGetBookFlashSale } from "../../service/BookService";

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
  const [flashSaleData, setFlashSaleData] = useState([]);
  const handleGetFlashSale = async () => {
    try {
      const response = await callGetBookFlashSale();
      console.log("Flash sale data:", response);
      if (response && response.code === 200) {
        setFlashSaleData(response.result.result.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching flash sale data:", error);
    }
  };
  useEffect(() => {
    handleGetFlashSale();
  }, []);
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
          <Row gutter={16} style={{ position: "relative", zIndex: 10 }}>
            {flashSaleData.map((product) => (
              <Col span={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <div className="image-container">
                      <Image
                        preview={false}
                        src={product.thumbnail}
                        width={190}
                      />
                    </div>
                  }
                >
                  <Title level={5} className="product-title">
                    {product.title}
                  </Title>
                  <div className="price">
                    <Text className="discount-price">
                      {product.currentPrice.toLocaleString()} đ
                    </Text>
                    <Tag color="red">-{product.discount * 100}%</Tag>
                  </div>
                  <Text delete>{product.originalPrice.toLocaleString()} đ</Text>
                  <Progress percent={25} showInfo={false} />
                  <Text>Đã bán 5</Text>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="background"></div>
        </div>
        <CateProductList />
        <BestSellerRanking />
      </div>
    </div>
  );
};

export default HomePage;
