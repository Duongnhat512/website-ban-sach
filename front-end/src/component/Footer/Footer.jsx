import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="bg-gray-100 py-10 text-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 bg-white rounded-lg shadow-lg py-6">
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12} md={6} className="space-y-3">
            <img src={logo} alt="Fahasa" className="w-64" />
            <p>
              Lầu 5, 387-389 Hai Bà Trưng, Quận 3, TP. HCM <br />
              Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
            </p>
            <p>Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.</p>
            <div className="flex space-x-3 text-xl">
              <a href="#" className="text-gray-700 hover:text-pink-500">
                <FacebookOutlined />
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-500">
                <InstagramOutlined />
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-500">
                <TwitterOutlined />
              </a>
              <a href="#" className="text-gray-700 hover:text-pink-500">
                <YoutubeOutlined />
              </a>
            </div>
          </Col>

          {/** Dịch vụ **/}
          <Col xs={12} sm={6} md={4}>
            <h4 className="font-bold mb-2">DỊCH VỤ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Giới thiệu Fahasa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Hệ thống nhà sách
                </a>
              </li>
            </ul>
          </Col>

          {/** Hỗ trợ **/}
          <Col xs={12} sm={6} md={4}>
            <h4 className="font-bold mb-2">HỖ TRỢ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chính sách đổi - trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chính sách khách sĩ
                </a>
              </li>
            </ul>
          </Col>

          {/** Tài khoản **/}
          <Col xs={12} sm={6} md={4}>
            <h4 className="font-bold mb-2">TÀI KHOẢN CỦA TÔI</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Đăng nhập/Tạo tài khoản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Thay đổi địa chỉ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Chi tiết tài khoản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Lịch sử mua hàng
                </a>
              </li>
            </ul>
          </Col>

          {/** Liên hệ **/}
          <Col xs={24} sm={12} md={6}>
            <h4 className="font-bold mb-2">LIÊN HỆ</h4>
            <p>📍 60-62 Lê Lợi, Q.1, TP. HCM</p>
            <p>📧 cskh@fahasa.com.vn</p>
            <p>📞 1900636467</p>
          </Col>
        </Row>

        <div className="text-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-300">
          Giấy chứng nhận ĐKKD số 0304132047 do Sở Kế hoạch & Đầu tư TP HCM cấp
          ngày 20/12/2005
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
