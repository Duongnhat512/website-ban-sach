import { useEffect, useState } from "react";
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
import "./HomePage.scss";
import ContainerHome1 from "./contanerhome1/containerhome1";
import FlashIcon from "../../assets/images/label-flashsale.svg?url";
import CateProductList from "./cateproductlist/cateproductlist";
import BestSellerRanking from "./bestSellerRanking/bestSellerRanking";
import { callGetBookFlashSale } from "../../service/BookService";
import { useNavigate } from "react-router-dom";
import Suggest from "../../component/Suggest/Suggest";

const { Title, Text } = Typography;
const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24; // 24 hours from now

const HomePage = () => {
  const navigate = useNavigate();
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
              <Col
                span={6}
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
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
        <Suggest />
        {/* <BestSellerRanking /> */}
      </div>
    </div>
  );
};

export default HomePage;
