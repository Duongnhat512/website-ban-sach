import Banner1_1 from "../../assets/images/banner1_1.png";
import Banner1_2 from "../../assets/images/banner1_2.png";
import product1 from "../../assets/images/product1.png";
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
import xuHuongIcon from "../../assets/images/xuhuongIcon.png";

const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;
import { useState } from "react";
import Suggest from "../../component/Suggest/Suggest";
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
const ProductList = () => {
  const [selectedTag, setSelectedTag] = useState("Xu hướng theo ngày");
  const products = productsByTag[selectedTag];

  return (
    <Layout className="cate-product-list" >
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
function Banner1() {
  return (
    <div className="container mx-auto " style={{ backgroundColor: "#33b564",maxWidth:1280,margin:"auto" }}>
      <div className="mx-auto ">
        <div className="">
          <Image
            preview={false}
            src={Banner1_1}
            alt="Image 1"
            className="side-image"
          />
        </div>
        <div className="">
          <Image
            preview={false}
            src={Banner1_2}
            alt="Image 2"
            className="side-image"
          />
        </div>
        <ProductList />
      </div>
      <Suggest />
    </div>
  );
}

export default Banner1;
