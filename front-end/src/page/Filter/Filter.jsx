import { useEffect, useState } from "react";
import {
  Card,
  Select,
  Pagination,
  Radio,
  Breadcrumb,
  Button,
  Checkbox,
} from "antd";
import {
  ShoppingCartOutlined,
  ReloadOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { callGetBookFilter } from "../../service/BookService";
import product1 from "../../assets/images/product1.png";
import Suggest from "../../component/Suggest/Suggest";
import { useDispatch, useSelector } from "react-redux";
import { doAddOrder, doRemoveOrder } from "../../redux/OrderSlice";
import { callGetAllCate } from "../../service/AdminService";
const Filter = () => {
  const location = useLocation();
  const [category, setCategory] = useState(location.state || {});
  console.log(location.state);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [bookList, setBookList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);
  const [releaseDateFilter, setReleaseDateFilter] = useState(null);
  const [sort, setSort] = useState("id:desc");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const handleCategoryCheckboxChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
  };

  const handlePublisherChange = (checkedValues) => {
    setSelectedPublishers(checkedValues);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleAddItem = (item) => {

    dispatch(doAddOrder({ ...item, amount: 1 }));
  };
  const handleGetAllCategory = async () => {
    try {
      const response = await callGetAllCate(100, 1, "id", "asc");
      if (response && response.code === 200) {
        console.log("responsee", response.result.result);

        setCategories(response.result.result);
      }
    } catch (error) {
      console.error("Failed to fetch book list:", error);
    }
  };
  useEffect(() => {
    handleGetAllCategory();
  }, []);
  useEffect(() => {
    // Nếu có category truyền sang và chưa chọn checkbox nào thì set luôn
    if (location.state && location.state.categoryName && selectedCategories.length === 0) {
      setSelectedCategories([location.state.categoryName]);
    }
    // eslint-disable-next-line
  }, [location.state]);
  const handleGetFilteredBooks = async () => {
    try {
      let minPrice = null;
      let maxPrice = null;

      priceFilter.forEach((range) => {
        switch (range) {
          case "0-150.000 đ":
            minPrice = minPrice === null ? 0 : Math.min(minPrice, 0);
            maxPrice = maxPrice === null ? 100000 : Math.max(maxPrice, 150000);
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
        search += `currentPrice>${minPrice}`;
      }
      if (maxPrice !== null) {
        search += `${search ? "," : ""}currentPrice<${maxPrice}`;
      }

      if (releaseDateFilter) {
        if (releaseDateFilter === "Trước Năm 2020") {
          search += `${search ? "," : ""}releasedDate<2020`;
        } else {
          search += `${search ? "," : ""}releasedDate.${releaseDateFilter.split(" ")[1]
            }`;
        }
      }
      let categoryNames =
        selectedCategories.length > 0
          ? selectedCategories.join(",")
          : (category && category.categoryName ? category.categoryName : undefined);
      let publisher = selectedPublishers.length > 0 ? selectedPublishers.join(",") : undefined;

      const response = await callGetBookFilter(
        currentPage,
        pageSize,
        sort,
        search,
        categoryNames,
        publisher
      );
      console.log("response", response);

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
  }, [currentPage, pageSize, priceFilter, releaseDateFilter, sort, selectedCategories, selectedPublishers]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleResetFilter = () => {
    setPriceFilter([]);
    setReleaseDateFilter(null);
    setSort("id:desc");
    setCurrentPage(1);
    setPageSize(9);
    setCategory({});
    setSelectedCategories([]);
    setSelectedPublishers([]);
  };

  const handlePriceFilterChange = (checkedValues) => {
    setPriceFilter(checkedValues);
  };

  const handleReleaseDateFilterChange = (e) => {
    setReleaseDateFilter(e.target.value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };
  const handleToggleCategories = () => {
    setShowAllCategories(!showAllCategories); // Đổi trạng thái hiển thị
  };
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
      <Breadcrumb>
        <Breadcrumb.Item
          onClick={() => navigate("/")}
          className="cursor-pointer text-blue-500"
        >
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item>Filter</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex gap-6">
        <div className="w-1/4 p-4 border rounded-lg bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Bộ Lọc</h3>
            <Button onClick={handleResetFilter} icon={<ReloadOutlined />} />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Giá</h4>
            <Checkbox.Group
              className="flex flex-col space-y-2"
              options={[
                "0-150.000 đ",
                "150.000-300.000 đ",
                "300.000-500.000 đ",
                "500.000-700.000 đ",
                "700.000 - Trở Lên",
              ]}
              onChange={handlePriceFilterChange}
              value={priceFilter}
            />
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Danh Sách Loại Sách</h4>
            <Checkbox.Group
              className="flex flex-col space-y-2"
              options={(showAllCategories
                ? categories
                : categories.slice(0, 6)
              )
                .filter(category => category && category.name) // Bỏ category null hoặc không có name
                .map((category) => ({
                  label: category.name,
                  value: category.name,
                }))}
              value={selectedCategories}
              onChange={handleCategoryCheckboxChange}
            />
            {categories.length > 6 && (
              <div className="flex justify-center mt-4">
                <Button
                  type="link"
                  className="flex items-center text-blue-500"
                  onClick={handleToggleCategories}
                >
                  {showAllCategories ? "Ẩn bớt" : "Hiển thị chi tiết"}
                  {showAllCategories ? (
                    <UpOutlined className="ml-2" />
                  ) : (
                    <DownOutlined className="ml-2" />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Nhà Cung Cấp</h4>
            <Checkbox.Group
              className="flex flex-col space-y-2"
              options={[
                "Dân Trí",
                "Kim Đồng",
                "Hồng Đức",
                "Đồng Nai",
                "NXB Hà Nội",
                "NXB Tổng Hợp TPHCM",
                "NXB Thanh Niên",
                "Thế Giới",
              ]}
              value={selectedPublishers}
              onChange={handlePublisherChange}
            />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Ngôn Ngữ</h4>
            <Checkbox.Group
              className="flex flex-col space-y-2"
              options={["Tiếng Việt", "Song Ngữ Anh Việt", "Tiếng Anh"]}
            />
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Năm Phát Hành</h4>
            <Radio.Group
              className="flex flex-col space-y-2"
              options={[
                "Trước Năm 2020",
                "Năm 2021",
                "Năm 2022",
                "Năm 2023",
                "Năm 2024",
                "Năm 2025",
              ]}
              onChange={handleReleaseDateFilterChange}
              value={releaseDateFilter}
            />
          </div>
        </div>

        {/* Danh sách sách */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sắp Xếp Theo</h2>
            <Select
              defaultValue="id:desc"
              className="w-48"
              onChange={handleSortChange}
              value={sort}
            >
              <Select.Option value="id:desc">Sản Phẩm Mới Nhất</Select.Option>
              <Select.Option value="currentPrice:asc">
                Giá Từ Thấp Đến Cao
              </Select.Option>
              <Select.Option value="currentPrice:desc">
                Giá Từ Cao Đến Thấp
              </Select.Option>
              <Select.Option value="discount:asc">
                Giảm giá Từ Thấp Đến Cao
              </Select.Option>
              <Select.Option value="discount:desc">
                Giảm giá Từ Cao Đến Thấp
              </Select.Option>
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
                    height={250}
                    width={250}
                  />
                }
                actions={[
                  <ShoppingCartOutlined
                    key="cart"
                    onClick={() => handleAddItem(book)}
                  />,
                ]}
              >
                <Card.Meta
                  onClick={() => navigate(`/product/${book.id}`)}
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
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      <Suggest />
    </div>
  );
};

export default Filter;
