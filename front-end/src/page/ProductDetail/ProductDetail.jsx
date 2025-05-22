import React, { useEffect, useState } from "react";
import { getBookById, getFullImageBook } from "../../service/BookService";
import {
  getCommentsByBookId,
  createComment,
  deleteComment,
} from "../../service/CommentService";
import { useDispatch } from "react-redux";
import { doAddToOrder } from "../../redux/OrderSlice"; // Đảm bảo bạn có action này trong slice
import { useNavigate, useParams } from "react-router-dom";
import {
  GiftOutlined,
  CreditCardOutlined,
  CarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

import "./ProductDetail.css";
import { Breadcrumb, Image, message } from "antd";
import Suggest from "../../component/Suggest/Suggest";
const ProductDetail = () => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState("");
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { user = {} } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const promotions = [
    {
      icon: <ThunderboltOutlined style={{ color: "#FFA500" }} />,
      text: "Mã giảm 50k - toàn quốc",
    },
    {
      icon: <CarOutlined style={{ color: "#28a745" }} />,
      text: "Mã giảm 20k - hỗ trợ vận chuyển",
    },
    {
      icon: <CreditCardOutlined style={{ color: "#1890ff" }} />,
      text: "Home credit: giảm 10%",
    },
    {
      icon: <GiftOutlined style={{ color: "#722ed1" }} />,
      text: "Tặng 01 sổ tay hiện đại",
    },
  ];
  function Promotions() {
    return (
      <div className="promotion-wrapper">
        <div className="promo-list">
          {promotions.map((promo, index) => (
            <button
              className="promo-item"
              key={index}
              onClick={() => navigate("/cart")}
            >
              <span className="promo-icon">{promo.icon}</span>
              <span className="promo-text">{promo.text}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  const handleAddToCart = () => {
    const item = {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      currentPrice: product.currentPrice,
      originalPrice: product.originalPrice,
      amount: quantity,
      releaseDate: product.releaseDate,
      selected: true,
    };

    dispatch(doAddToOrder(item));
    message.success("Thêm vào giỏ hàng thành công!");
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Xóa bình luận thất bại:", error);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(); // Thêm vào giỏ trước
    navigate("/cart"); // Chuyển hướng đến trang giỏ hàng
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getCommentsByBookId(id);
        setComments(res);

        setToken(localStorage.getItem("token"));
        console.log("Token lấy từ localStorage:", token);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    console.log("name" + user.fullName);
    try {
      const commentData = {
        userId: user.id, // giả sử user id là 1
        bookId: id,
        userName: user.fullName,
        content: newComment,
        dateTime: new Date(),
      };
      console.log(commentData);
      await createComment(commentData);
      setNewComment("");
      const updatedComments = await getCommentsByBookId(id);
      setComments(updatedComments);
    } catch (err) {
      console.error("Error submitting comment", err);
    }
  };

  const { id } = useParams();;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [thumbnails, setThumbnails] = useState([
  ]);

  const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  useEffect(() => {
const fetchProductDetails = async () => {
  try {
    const response = await getBookById(id);
    const imageList = await getFullImageBook(id); // lấy danh sách ảnh

    const combinedImages = [
      { imageUrl: response.thumbnail },
      ...imageList.result.map((img) => ({ imageUrl: img })),
    ];

    setProduct(response);
    setThumbnails(combinedImages);
    setSelectedImage(response.thumbnail); // mặc định ảnh bìa là ảnh đầu tiên
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};
    fetchProductDetails();
  }, []);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-[1280px] mx-auto  p-6  flex flex-col">
      <Breadcrumb className="mb-4 mt-4">

        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item >Product Detail</Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>
      <div className=" mx-auto p-4 bg-white rounded-lg flex gap-6 shadow-lg border mt-4">
        <div className="w-1/3">
          <Image
            src={selectedImage || product.thumbnail}
            alt="Main Product"
            className="w-full h-80 object-cover"
          />
          <div className="w-full max-w-[300px] overflow-x-auto">
            <div className="flex gap-2 mt-2">
              <Image.PreviewGroup>
                {thumbnails.map((thumb, index) => (
                  <Image
                    key={index}
                    width={64}
                    height={48}
                    src={thumb.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className={`object-cover cursor-pointer border ${selectedImage === thumb.imageUrl ? "border-red-500" : "border-gray-300"}`}
                    onClick={() => setSelectedImage(thumb.imageUrl)}
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          </div>
          {/* Buttons below thumbnails */}
          <div className="mt-4 flex gap-2">
            <button
              className="border border-red-700 text-red-700 px-4 py-1 text-sm rounded w-full bg-white h-10 text-xxl hover:bg-red-700 hover:text-white transition-all duration-300 ease-in-out hover:shadow-md"
              onClick={() => handleAddToCart()}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              className="border bg-red-700 text-white px-4 py-1 text-sm rounded w-full h-10 text-xxl hover:bg-white hover:text-red-700 hover:border-red-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ease-in-out"
              onClick={() => handleBuyNow()}
            >
              Mua ngay
            </button>
          </div>
          <div className="mt-6 border-t pt-4">
            <h3 className="font-bold">Chính sách ưu đãi của Fahasa</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300" />
                <span>
                  <strong>Thời gian giao hàng:</strong> Giao nhanh và uy tín
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300" />
                <span>
                  <strong>Chính sách đổi trả:</strong> Đổi trả miễn phí toàn
                  quốc
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300" />
                <span>
                  <strong>Chính sách khách sỉ:</strong> Ưu đãi khi mua số lượng
                  lớn
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-2/3">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-gray-600">Tác giả: {product.author}</p>
          <p className="text-gray-600">Nhà xuất bản: Kim Đồng</p>
          <p className="text-gray-600">Bìa: Mềm</p>

          <div className="bg-red-100 p-2 my-2 inline-block text-red-500 font-bold">
            FLASH SALE
          </div>
          <p className="text-red-500 font-bold text-lg">
            {formatVND(product.currentPrice)}{" "}
            <span className="line-through text-gray-500">
              {" "}
              {formatVND(product.originalPrice)}
            </span>{" "}
            <span className="discount-badge"> {product.discount}%</span>
          </p>

          {/* Shipping Info */}
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-bold pt-2">Thông tin vận chuyển</h3>
            <p className="text-gray-600">
              Giao hàng đến: Phường Bến Nghé, Quận 1, Hồ Chí Minh
            </p>
            <p className="text-gray-600">
              Giao hàng tiêu chuẩn: Dự kiến giao Thứ tư - 26/02
            </p>
          </div>

          {/* Related Offers */}
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-bold">
              Ưu đãi liên quan{" "}
              <a href="#" className="text-blue-500 px-2">
                Xem thêm &rarr;
              </a>
            </h3>
            <div className="flex gap-2 mt-2">
              <Promotions />
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mt-4 p-4 border rounded-lg flex items-center gap-4">
            <h3 className="font-bold">Số lượng:</h3>
            <div className="flex items-center border rounded">
              <button className="px-4 py-2 border-r" onClick={decreaseQuantity}>
                -
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button className="px-4 py-2 border-l" onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>

          {/* Additional Details */}
          <h2 className="text-xl font-semibold my-4">Thông tin chi tiết</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Mã hàng:</strong> {product.id}
            </p>

            <p>
              <strong>Tác giả:</strong> {product.author}
            </p>
            <p>
              <strong>NXB:</strong> {product.publisher}
            </p>

            <p>
              <strong>Số trang:</strong> {product.pages}
            </p>
          </div>
          {/* Product Description */}
          <div className="mt-4">
            <h3 className="font-bold">Mô tả sản phẩm</h3>
            <p className="text-gray-600"></p>
          </div>
        </div>
      </div>
      {/* Đánh giá sản phẩm */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-3xl font-bold">0</span>
          <span className="text-lg">/5</span>
        </div>
        <p className="text-sm text-gray-500">(0 đánh giá)</p>
        <div className="mt-2 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <span>{star} sao</span>
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-2 bg-gray-400" style={{ width: "0%" }}></div>
              </div>
              <span>0%</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Chỉ có thành viên mới có thể viết nhận xét. Vui lòng{" "}
          <a href="#" className="text-blue-500">
            đăng nhập
          </a>{" "}
          hoặc{" "}
          <a href="#" className="text-blue-500">
            đăng ký
          </a>
          .
        </p>
      </div>
      {/* Comment Section */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow border">
        {user && (
          <>
            <h3 className="text-lg font-semibold mb-2">Bình luận</h3>

            {/* Input new comment */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              rows={3}
              placeholder="Viết bình luận của bạn..."
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Gửi bình luận
            </button>
          </>
        )}

        {/* List of comments */}
        <div className="mt-4 space-y-4">
          {user &&
            comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-item">
                  <p className="comment-text">
                    {comment.userName || "Người dùng"}: {comment.content}
                  </p>
                  <div className="comment-meta">
                    <span className="comment-date">
                      {new Date(comment.dateTime).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                    {/* Chỉ hiển thị nút xóa nếu comment của user hiện tại */}
                    {comment.userId == user.id && (
                      <button
                        className="delete-comment"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <span style={{ fontSize: "12px", color: "blue" }}>
                          xóa bình luận
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Suggest />
    </div>
  );
};
export default ProductDetail;
