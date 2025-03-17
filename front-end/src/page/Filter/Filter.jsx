import React, { useEffect, useState } from "react";
import { Card, Badge, Select, Pagination, Checkbox, Breadcrumb } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { callGetBookFilter } from "../../service/BookService";
import product1 from "../../assets/images/product1.png";
import Suggest from "../../component/Suggest/Suggest";

const Filter = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [bookList, setBookList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);
  const [sort, setSort] = useState("id:desc"); // Thêm trạng thái sort
  const navigate = useNavigate();

  const handleGetFilteredBooks = async () => {
    try {
      let minPrice = null;
      let maxPrice = null;

      priceFilter.forEach(range => {
        switch (range) {
          case "0-150.000 đ":
            minPrice = minPrice === null ? 0 : Math.min(minPrice, 0);
            maxPrice = maxPrice === null ? 150000 : Math.max(maxPrice, 150000);
            break;
          case "150.000-300.000 đ":
            minPrice = minPrice === null ? 150000 : Math.min(minPrice, 150000);
            maxPrice = maxPrice === null ? 300000 : Math.max(maxPrice, 300000);
            break;
          case "300.000-500.000 đ":
            minPrice = minPrice === null ? 300000 : Math.min(minPrice, 300000);
            maxPrice = maxPrice === null ? 500000 : Math.max(maxPrice, 500000);
            break;
          case "500.000-700.000 đ":
            minPrice = minPrice === null ? 500000 : Math.min(minPrice, 500000);
            maxPrice = maxPrice === null ? 700000 : Math.max(maxPrice, 700000);
            break;
          case "700.000 - Trở Lên":
            minPrice = minPrice === null ? 700000 : Math.min(minPrice, 700000);
            break;
          default:
            break;
        }
      });

      let search = "";
      if (minPrice !== null) {
        search += `currentPrice>=${minPrice}`;
      }
      if (maxPrice !== null) {
        search += `${search ? "," : ""}currentPrice<=${maxPrice}`;
      }

      const response = await callGetBookFilter(currentPage, pageSize, sort, search); // Sử dụng giá trị sort từ trạng thái
      if (response && response.code === 200) {
        setBookList(response.result.result);
        setTotalElements(response.result.totalElements);
        setTotalPages(response.result.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch book list:", error);
    }
  };

  useEffect(() => {
    handleGetFilteredBooks();
  }, [currentPage, pageSize, priceFilter, sort]); // Cập nhật khi `currentPage`, `pageSize`, `priceFilter`, hoặc `sort` thay đổi

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleViewAll = () => {
    navigate('/filter');
  };

  const handlePriceFilterChange = (checkedValues) => {
    setPriceFilter(checkedValues);
  };

  const handleSortChange = (value) => {
    setSort(value);
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
              onChange={handlePriceFilterChange}
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
            <h2 className="text-xl font-bold">Sắp Xếp Theo</h2>
            <Select defaultValue="id:desc" className="w-48" onChange={handleSortChange}>
              <Select.Option value="id:desc">Sản Phẩm Mới Nhất</Select.Option>
              <Select.Option value="currentPrice:asc">Giá Từ Thấp Đến Cao</Select.Option>
              <Select.Option value="currentPrice:desc">Giá Từ Cao Đến Thấp</Select.Option>
              <Select.Option value="discount:asc">Giảm giá Từ Thấp Đến Cao</Select.Option>
              <Select.Option value="discount:desc">Giảm giá Từ Cao Đến Thấp</Select.Option>
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
                    src={product1 || book.thumbnail}
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