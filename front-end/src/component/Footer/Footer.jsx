import React from "react";
import { Layout, Row, Col } from "antd";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import "./Footer.scss";
import logo from "../../assets/images/logo.png"
const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="footer-container">
      <div className="container">
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12} md={6} className="footer-section">
            <img src={logo} alt="Fahasa" width={250} />
            <p>
              Lầu 5, 387-389 Hai Bà Trưng, Quận 3, TP. HCM
              <br />
              Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
            </p>
            <p>Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.</p>
            <div className="social-icons">
              <a href="#"><FacebookOutlined /></a>
              <a href="#"><InstagramOutlined /></a>
              <a href="#"><TwitterOutlined /></a>
              <a href="#"><YoutubeOutlined /></a>
            </div>
          </Col>

          <Col xs={12} sm={6} md={4} className="footer-section">
            <h4>DỊCH VỤ</h4>
            <ul>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Chính sách thanh toán</a></li>
              <li><a href="#">Giới thiệu Fahasa</a></li>
              <li><a href="#">Hệ thống nhà sách</a></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} md={4} className="footer-section">
            <h4>HỖ TRỢ</h4>
            <ul>
              <li><a href="#">Chính sách đổi - trả</a></li>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách vận chuyển</a></li>
              <li><a href="#">Chính sách khách sĩ</a></li>
            </ul>
          </Col>

          <Col xs={12} sm={6} md={4} className="footer-section">
            <h4>TÀI KHOẢN CỦA TÔI</h4>
            <ul>
              <li><a href="#">Đăng nhập/Tạo tài khoản</a></li>
              <li><a href="#">Thay đổi địa chỉ</a></li>
              <li><a href="#">Chi tiết tài khoản</a></li>
              <li><a href="#">Lịch sử mua hàng</a></li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6} className="footer-section">
            <h4>LIÊN HỆ</h4>
            <p>📍 60-62 Lê Lợi, Q.1, TP. HCM</p>
            <p>📧 cskh@fahasa.com.vn</p>
            <p>📞 1900636467</p>
          </Col>
        </Row>

        <div className="footer-bottom">
          Giấy chứng nhận ĐKKD số 0304132047 do Sở Kế hoạch & Đầu tư TP HCM cấp ngày 20/12/2005
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
