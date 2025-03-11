import React, { useEffect, useState } from "react";
import { Card, Badge, Select, Pagination, Checkbox, Breadcrumb } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { callGetBook } from "../../service/BookService";
import product1 from "../../assets/images/product1.png";
import Suggest from "../../component/Suggest/Suggest";

const Filter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [bookList, setBookList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  const handleGetAllBook = async () => {
    try {
      const response = await callGetBook(1, 16);
      if (response && response.code === 200) {
        setBookList(response.result.result);
        setTotalElements(response.result.totalElements);
        console.log(response.result.result);
      }
    } catch (error) {
      console.error("Failed to fetch book list:", error);
    }
  };

  useEffect(() => {
    handleGetAllBook();
  }, [currentPage, pageSize]); // Cập nhật khi `currentPage` hoặc `pageSize` thay đổi
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/")}
          className="cursor-pointer text-blue-500"
        >
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Bộ lọc</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex gap-6">
        {/* Bộ lọc */}
        <div className="w-1/4 p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-bold mb-4">Bộ Lọc</h3>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Giá</h4>
            <Checkbox.Group
              options={[
                "0-150.000 đ",
                "150.000-300.000 đ",
                "300.000-500.000 đ",
                "500.000-700.000 đ",
                "700.000 - Trở Lên",
              ]}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Nhà Cung Cấp</h4>
            <Checkbox.Group
              options={[
                "Cty Văn Hóa Sách Việt",
                "Megabook",
                "Nhà Sách Minh Thắng",
                "Cty Văn Hóa Khang Việt",
                "Zenbooks",
                "Cty Phương Nam",
                "Minh Long",
                "MC Books",
              ]}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ngôn Ngữ</h4>
            <Checkbox.Group
              options={["Tiếng Việt", "Song Ngữ Anh Việt", "Tiếng Anh"]}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hình Thức</h4>
            <Checkbox.Group options={["Bìa Mềm", "Bìa Cứng", "Cards"]} />
          </div>
        </div>

        {/* Danh sách sách */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sách Tham Khảo</h2>
            <Select defaultValue="bestseller" className="w-48">
              <Select.Option value="bestseller">Bán Chạy Tuần</Select.Option>
              <Select.Option value="latest">Mới Nhất</Select.Option>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookList.map((book, index) => (
              <Card
                key={index}
                hoverable
                cover={
                  <img
                    alt={book.title}
                    src={book.thumbnail || product1}
                    className="p-2"
                  />
                }
                actions={[<ShoppingCartOutlined key="cart" />]}
              >
                <Card.Meta
                  title={
                    <div className="text-lg font-semibold">{book.title}</div>
                  }
                  description={
                    <>
                      <div className="text-sm text-gray-500">
                        {book.originalPrice && (
                          <span className="line-through mr-2">
                            {formatCurrency(book.originalPrice)}
                          </span>
                        )}
                        {book.discount && (
                          <span className="text-red-500">{book.discount}%</span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {book.currentPrice
                          ? formatCurrency(book.currentPrice)
                          : "Liên hệ"}
                      </div>
                      <div className="text-sm text-gray-500">Đã bán 420</div>
                    </>
                  }
                />
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              total={totalElements}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)} // Cập nhật ngay khi đổi trang
            />
          </div>
        </div>
      </div>
      <Suggest />
    </div>
  );
};

export default Filter;
