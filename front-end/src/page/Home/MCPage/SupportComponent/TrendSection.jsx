import React, { useState } from 'react';
import './TrendSection.css';
import { useNavigate } from "react-router-dom";
function TrendSection({tilte}) {
  const navigate = useNavigate();
  // Danh sách tab demo
  const tabs = [
    { id: 1, label: 'Xu hướng hôm nay' },
    { id: 2, label: 'Sách hot - Giảm sốc' },
    { id: 3, label: 'Bestseller Ngoại Văn' },
  ];
  const [activeTab, setActiveTab] = useState(1);
  const [products,setProducts] = useState([
    {
      id: 1,
      title: 'Hoa học trò - Số 1451',
      image: 'src/assets/images/product1.png',
      discount: 15,     // 15%
      price: 19000,     // 19.000đ
      oldPrice: 22000,  // 22.000đ
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Storytelling - Lấy lòng người đọc',
      image: 'src/assets/images/product1.png',
      discount: 25,
      price: 148500,
      oldPrice: 198000,
      rating: 5,
    },
    {
      id: 3,
      title: 'A Little Life',
      image: 'src/assets/images/product1.png',
      discount: 30,
      price: 306000,
      oldPrice: 438000,
      rating: 4,
    },
    {
      id: 4,
      title: 'Combo Manga - Attack on Titan',
      image: 'src/assets/images/product1.png',
      discount: 13,
      price: 413524,
      oldPrice: 475000,
      rating: 4.5,
    },
    {
      id: 5,
      title: 'Hoa Hồng Sớm Thắm',
      image: 'src/assets/images/product1.png',
      discount: 20,
      price: 22700,
      oldPrice: 28000,
      rating: 3.5,
    },
    {
      id: 1,
      title: 'Hoa học trò - Số 1451',
      image: 'src/assets/images/product1.png',
      discount: 15,     // 15%
      price: 19000,     // 19.000đ
      oldPrice: 22000,  // 22.000đ
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Storytelling - Lấy lòng người đọc',
      image: 'src/assets/images/product1.png',
      discount: 25,
      price: 148500,
      oldPrice: 198000,
      rating: 5,
    },
    {
      id: 3,
      title: 'A Little Life',
      image: 'src/assets/images/product1.png',
      discount: 30,
      price: 306000,
      oldPrice: 438000,
      rating: 4,
    },
    {
      id: 4,
      title: 'Combo Manga - Attack on Titan',
      image: 'src/assets/images/product1.png',
      discount: 13,
      price: 413524,
      oldPrice: 475000,
      rating: 4.5,
    },
    {
      id: 5,
      title: 'Hoa Hồng Sớm Thắm',
      image: 'src/assets/images/product1.png',
      discount: 20,
      price: 22700,
      oldPrice: 28000,
      rating: 3.5,
    },
  ]);
  // Dữ liệu sản phẩm demo (tuỳ ý thay đổi)

  // Xử lý click vào tab
  const handleTabClick = (id) => {
    setActiveTab(id);
    // Có thể lọc/sửa data products theo tab nếu muốn
  };

  // Hàm tính ra mảng sao “★” dựa trên rating
  const getStars = (rating) => {
    const starCount = Math.floor(rating);        // Số sao đầy
    const halfStar = rating % 1 !== 0;          // Có nửa sao hay không
    let stars = '★'.repeat(starCount);
    if (halfStar) stars += '½';                // Biểu thị nửa sao (có thể dùng icon khác)
    return stars;
  };

  // Hàm chuyển format tiền tệ
  const formatPrice = (val) => val.toLocaleString('vi-VN');

  return (
    <div className="trend-section">
      {/* Header */}
      <div className="trend-header">
        <h2 className="trend-title">{tilte}</h2>
      </div>

      {/* Tab */}

      {/* Danh sách sản phẩm */}
      <div className="trend-products">
        {products.map((product) => (
          <div key={product.id} className="trend-product-card">
            <div className="product-image-wrap">
              {/* Dấu giảm % nếu có */}
              {product.discount > 0 && (
                <span className="product-discount-badge">-{product.discount}%</span>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>
            <h3 className="product-title">{product.title}</h3>
            {/* Giá */}
            <div className="product-price">
              <span className="price-current">{formatPrice(product.price)}đ</span>
              <span className="price-old">{formatPrice(product.oldPrice)}đ</span>
            </div>
            {/* Rating (sao) */}
            <div className="product-rating">
              {getStars(product.rating)}
            </div>
          </div>
        ))}
      </div>

      {/* Nút Xem thêm */}
      <div className="trend-more-btn-wrap">
        <button
          className="trend-more-btn"
          onClick={() => navigate("/")}
        >
          Xem Thêm
        </button>
      </div>
    </div>
  );
}

export default TrendSection;
