import React from "react";
import CouponItem from "./CouponItem";
import "./PromoSection.css";
import TitleBanner from './TitleBanner';
function PromoSection({ title, coupons }) {
  const bannerImage = "src/page/Home/MCPage/asset/bannerGiamGia.jpg";
  return (
    <section className="promo-section">
      <TitleBanner text={title } backgroundImage={bannerImage}/>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <CouponItem
            key={coupon.id}
            image={coupon.image}
            title={coupon.title}
            description={coupon.description}
            expiry={coupon.expiry}
          />
        ))}
      </div>
    </section>
  );
}

export default PromoSection;
