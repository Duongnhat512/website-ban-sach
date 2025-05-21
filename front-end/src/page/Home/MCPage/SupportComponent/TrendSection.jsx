import React, { useState,useEffect  } from 'react';
import './TrendSection.css';
import { useNavigate } from "react-router-dom";
import { callGetBookByCategory } from "../../../../service/BookService";

function TrendSection({tilte}) {
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const data = await callGetBookByCategory(tilte, 1, 10); // categoryName, page, size
      const books = data?.result.result || [];
      console.log(data);
      const mappedBooks = books.map(book => ({
        id: book.id,
        title: book.title,
        thumbnail: book.thumbnail,
        discount: book.discount,
        price: book.currentPrice,
        oldPrice: book.originalPrice,
        rating: book.rating || 4, // fallback nếu không có rating
      }));

      setProducts(mappedBooks);
    } catch (error) {
      console.error("Lỗi khi tải sách theo danh mục:", error);
    }
  };

  fetchBooks();
}, []);
  const navigate = useNavigate();
  // Danh sách tab demo
  const tabs = [
    { id: 1, label: 'Xu hướng hôm nay' },
    { id: 2, label: 'Sách hot - Giảm sốc' },
    { id: 3, label: 'Bestseller Ngoại Văn' },
  ];
  const [activeTab, setActiveTab] = useState(1);
  const [products,setProducts] = useState([
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
          <div
            key={product.id}
            className="trend-product-card cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="product-image-wrap">
              {/* Dấu giảm % nếu có */}
              {product.discount > 0 && (
                <span className="product-discount-badge">-{product.discount}%</span>
              )}
              <img
                src={product.thumbnail}
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
