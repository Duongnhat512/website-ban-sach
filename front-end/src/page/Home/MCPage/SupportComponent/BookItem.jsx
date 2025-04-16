import React from 'react';
import './BestSellerSection.css';

function BookItem({ book }) {
  return (
    <div className="book-item">
      <div className="book-image-wrapper">
        <img src={book.image} alt={book.title} className="book-image" />
        {/* Nếu có mã coupon hiển thị trên ảnh, ví dụ: */}
        {book.couponCode && (
          <span className="discount-code">{book.couponCode}</span>
        )}
      </div>

      <h3 className="book-title">{book.title}</h3>
      <div className="book-price-info">
        <span className="book-price">
          {book.price.toLocaleString('vi-VN')} đ
        </span>
        <span className="book-old-price">
          {book.oldPrice.toLocaleString('vi-VN')} đ
        </span>
        <span className="book-discount">- {book.discount}%</span>
      </div>
    </div>
  );
}

export default BookItem;
