import React from 'react';
import './TitleBanner.css';

function TitleBanner({ text, backgroundImage }) {
  // Nếu có backgroundImage được truyền vào, tạo inline style để đặt backgroundImage
  const bannerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};
    
  return (
    <div className="title-banner" style={bannerStyle}>
      <h2 className="title-text">{text}</h2>
    </div>
  );
}

export default TitleBanner;
