import React from "react";
import TopMenu from "./SupportComponent/TopMenu";
import PromoSection from "./SupportComponent/PromoSection";
import "./MCPage.css";
import Banner from './SupportComponent/Banner';
import TrendSection from './SupportComponent/TrendSection';
import TitleBanner from "./SupportComponent/TitleBanner";
import { useNavigate } from "react-router-dom";
function MCPage() {
    //const bannerImage = "src/page/Home/maGiamGia/asset/bannerMC.jpg";
    const bannerImage = "src/page/Home/MCPage/asset/bannerGiamGia.jpg";
    const navigate = useNavigate();
  // Dữ liệu mẫu cho các section khuyến mãi
  const promoData = [
    {
      title: "Ưu đãi khung giờ gấp bội",
      coupons: [
        {
          id: 1,
          image: "https://via.placeholder.com/100x60",
          title: "Giảm 10% VPP & DCHS",
          description: "Giảm tối đa 50K cho đơn hàng từ 100K",
          expiry: "HSD: 30/04/25",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/100x60",
          title: "Giảm 20% Sách",
          description: "Áp dụng đơn tối thiểu 150K",
          expiry: "HSD: 15/05/25",
        },
        {
            id: 3,
            image: "https://via.placeholder.com/100x60",
            title: "Giảm 10% VPP & DCHS",
            description: "Giảm tối đa 50K cho đơn hàng từ 100K",
            expiry: "HSD: 30/04/25",
          },
          {
            id: 4,
            image: "https://via.placeholder.com/100x60",
            title: "Giảm 20% Sách",
            description: "Áp dụng đơn tối thiểu 150K",
            expiry: "HSD: 15/05/25",
          },
          {
            id: 5,
            image: "https://via.placeholder.com/100x60",
            title: "Giảm 10% VPP & DCHS",
            description: "Giảm tối đa 50K cho đơn hàng từ 100K",
            expiry: "HSD: 30/04/25",
          },
          {
            id: 6,
            image: "https://via.placeholder.com/100x60",
            title: "Giảm 20% Sách",
            description: "Áp dụng đơn tối thiểu 150K",
            expiry: "HSD: 15/05/25",
          },
          {
              id: 7,
              image: "https://via.placeholder.com/100x60",
              title: "Giảm 10% VPP & DCHS",
              description: "Giảm tối đa 50K cho đơn hàng từ 100K",
              expiry: "HSD: 30/04/25",
            },
            {
              id: 8,
              image: "https://via.placeholder.com/100x60",
              title: "Giảm 20% Sách",
              description: "Áp dụng đơn tối thiểu 150K",
              expiry: "HSD: 15/05/25",
            },
            {
                id: 9,
                image: "https://via.placeholder.com/100x60",
                title: "Giảm 20% Sách",
                description: "Áp dụng đơn tối thiểu 150K",
                expiry: "HSD: 15/05/25",
              },
      ],
    },
    {
      title: "Ưu đãi D-day gấp bội",
      coupons: [
        {
          id: 3,
          image: "https://via.placeholder.com/100x60",
          title: "Giảm 50K",
          description: "Cho đơn hàng từ 200K",
          expiry: "HSD: 01/05/25",
        },
        {
          id: 4,
          image: "https://via.placeholder.com/100x60",
          title: "Giảm 30% Mặt hàng XYZ",
          description: "Tối đa 100K",
          expiry: "HSD: 07/05/25",
        },
      ],
    },
  ];

  return (
    <div className="MCPage">
      {/* Thanh menu trên cùng */}
      <Banner />

      {/* Render các khối ưu đãi */}
      {promoData.map((section, index) => (
        <PromoSection
          key={index}
          title={section.title}
          coupons={section.coupons}
          bannerImage={"src/page/Home/maGiamGia/ađásset/cc.jpg"}
        />
      ))}
       <section className="promo-section">
       <TitleBanner text={"Tủ sách MCBook" } backgroundImage={bannerImage}/>
       </section>
      <TrendSection tilte = {"Tủ sách MCBook"} navigate={navigate}/>
      <section className="promo-section">
       <TitleBanner text={"THAM KHẢO" } backgroundImage={bannerImage}/>
       </section>
      <TrendSection tilte = {"Sách tham khảo"}  navigate={navigate}/>
    </div>
  );
}

export default MCPage;
