import React from 'react';
import './CouponItem.css';
import { message } from 'antd';

function CouponItem({
  image = "https://via.placeholder.com/40/78C257/FFFFFF?text=Truck",
  label = "Freeship",
  title = "Giảm 10% VPP & DCHS",
  condition1 = "ĐH từ 200K",
  condition2 = "Nhập mã ngay",
  expiry = "HSD: 30/04/25",
  progressPercentage = 50
}) {
  const handleSave = () => {
    // alert('Đã lưu mã thành công!');
    message.success('Đã lưu mã thành công!' );
  };

  return (
    <div className="coupon-container">
      {/* Phần bên trái: icon + nhãn */}
      <div className="coupon-left">
        <img src={image} alt="Coupon Icon" className="coupon-icon" />
        <span className="coupon-label">{label}</span>
      </div>

      {/* Phần bên phải: text trên + hàng dưới (progress bar + nút) */}
      <div className="coupon-right">
        {/* Khối text */}
        <div className="coupon-right-top">
          <h3 className="coupon-title">{title}</h3>
          <p className="coupon-condition">{condition1}</p>
          <p className="coupon-condition">{condition2}</p>
          <p className="coupon-expiry">{expiry}</p>
        </div>

        {/* Khối bottom: thanh tiến trình + nút nằm cùng dòng */}
        <div className="coupon-right-bottom">
          <div className="coupon-progress-bar">
            <div
              className="coupon-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <button className="coupon-save-button" onClick={handleSave}>
            Lưu mã
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponItem;
