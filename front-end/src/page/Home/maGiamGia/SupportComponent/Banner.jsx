// src/components/Banner.js
import React from 'react';
import './Banner.css'; // File CSS (tạo ở bước kế tiếp)

function Banner() {
  return (
    <div className="banner-container">
      <img
        src="src\page\Home\maGiamGia\asset\banner.png"  // Đường dẫn ảnh thực tế
        alt="Khuyến mãi"
        className="banner-image"
      />
    </div>
  );
}

export default Banner;
