import { Row, Col, Image } from "antd";
import "./ContainerHome1.scss";
import CarouselComponent from "../../../component/Carosel/CaroselComponent";
import main1 from "../../../assets/images/home1.png";
import main2 from "../../../assets/images/home2.png";
import img1 from "../../../assets/images/header1.png";
import img2 from "../../../assets/images/header2.png";
import img3 from "../../../assets/images/header3.png";
import img4 from "../../../assets/images/header4.png";
import bansi from "../../../assets/images/bansi.png";
import dinhti from "../../../assets/images/dinhti.png";
import flashsale from "../../../assets/images/flashsale.png";
import manga from "../../../assets/images/manga.png";
import mcbook from "../../../assets/images/mcbook.png";
import phienchocu from "../../../assets/images/phienchocu.png";
import sanphammoi from "../../../assets/images/sanphammoi.png";
import trogia from "../../../assets/images/trogia.png";
import { useNavigate } from "react-router-dom";


function ContainerHome1() {
  const navigate = useNavigate();
  
  const handleImageClick = () => {
    navigate("/Banner1");
  };

  return (
    <>
      <div className="sub-container-1">
        <Row gutter={16}>
          <Col span={16}>
            <CarouselComponent />
          </Col>
          <Col span={8}>
            <div className="image-container">
              <Image
                preview={false}
                src={main1}
                alt="Image 1"
                className="side-image"
                onClick={handleImageClick}
              />
              <Image
                preview={false}
                src={main2}
                alt="Image 2"
                className="side-image"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="sub-container-2">
        <Row gutter={16}>
          <Col span={6}>
            <Image
              preview={false}
              src={img1}
              alt="Image 1"
              className="link-image"
            />
          </Col>
          <Col span={6}>
            <Image
              preview={false}
              src={img2}
              alt="Image 2"
              className="link-image"
            />
          </Col>
          <Col span={6}>
            <Image
              preview={false}
              src={img3}
              alt="Image 3"
              className="link-image"
            />
          </Col>
          <Col span={6}>
            <Image
              preview={false}
              src={img4}
              alt="Image 4"
              className="link-image"
            />
          </Col>
        </Row>
      </div>
      <div className="sub-container-3">
        <div className="scroll-container">
          <Row
            gutter={16}
            style={{
              justifyContent: "space-around",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={flashsale}
                alt="Image 5"
                className="scroll-image"
              />
              <p className="scroll-text">Flash Sale</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer" onClick={()=>navigate("/MCpage")}>
              <Image
                preview={false}
                src={mcbook}
                alt="Image 4"
                className="scroll-image"
              
              />
              <p className="scroll-text">MCBOOKS</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={dinhti}
                alt="Image 7"
                className="scroll-image"
              />
              <p className="scroll-text">Đinh Tị</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={sanphammoi}
                alt="Image 8"
                className="scroll-image"
              />
              <p className="scroll-text">Sản Phẩm Mới</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={trogia}
                alt="Image 8"
                className="scroll-image"
              />
              <p className="scroll-text">Sản Phẩm Được Trợ Giá</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={phienchocu}
                alt="Image 8"
                className="scroll-image"
              />
              <p className="scroll-text">Phiên Chợ Đồ Cũ</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={bansi}
                alt="Image 8"
                className="scroll-image"
              />
              <p className="scroll-text">Bán Sỉ</p>
            </Col>
            <Col span={2} className="scroll-col cursor-pointer">
              <Image
                preview={false}
                src={manga}
                alt="Image 8"
                className="scroll-image"
              />
              <p className="scroll-text">Manga</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ContainerHome1;
