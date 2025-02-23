import React, { useRef } from "react";
import { Carousel, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./CarouselComponent.scss";
import Carosel1 from "../../assets/images/slide1.png";
import Carosel2 from "../../assets/images/slide2.png";
import Carosel3 from "../../assets/images/slide3.png";
import Carosel4 from "../../assets/images/slide4.png";

const CarouselComponent = () => {
  const carouselRef = useRef(null);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="carousel-container">
      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={5000}
        arrows={false}
      >
        <div>
          <Image src={Carosel1} alt="Slide 1" className="carousel-image" />
        </div>
        <div>
          <Image src={Carosel2} alt="Slide 2" className="carousel-image" />
        </div>
        <div>
          <Image src={Carosel3} alt="Slide 3" className="carousel-image" />
        </div>
        <div>
          <Image src={Carosel4} alt="Slide 4" className="carousel-image" />
        </div>
      </Carousel>
      <div className="custom-arrow custom-prev" onClick={handlePrev}><LeftOutlined /></div>
      <div className="custom-arrow custom-next" onClick={handleNext}><RightOutlined /></div>
    </div>
  );
};

export default CarouselComponent;