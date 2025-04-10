import React, { useEffect, useState } from "react";
import { getBookById } from "../../service/BookService";
import { getCommentsByBookId, createComment } from "../../service/CommentService";
const ProductDetail = () => {
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");

useEffect(() => {
  const fetchComments = async () => {
    try {
      const res = await getCommentsByBookId(id);
      setComments(res);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  fetchComments();
}, []);

const handleCommentSubmit = async () => {
  try {
    const commentData = {
      userId: 1, // giả sử user id là 1
      bookId: id,
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

  const id = 1;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const thumbnails = [
    "http://localhost:3000/src/assets/images/product1.png",
    "http://localhost:3000/src/assets/images/product1.png",
    "http://localhost:3000/src/assets/images/product1.png",
    "http://localhost:3000/src/assets/images/product1.png",
  ];

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getBookById(id);
        console.log(response);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, []);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg border flex flex-col">
      <div className="max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg flex gap-6">
        {/* Left Section - product Image & Thumbnails */}
        <div className="w-1/3">
          <img
            src={product.thumbnail}
            alt="Main Product"
            className="w-full h-80 object-cover"
          />
          <div className="flex gap-2 mt-2">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-12 object-cover cursor-pointer border border-gray-300 hover:border-red-500"
              />
            ))}
          </div>
          {/* Buttons below thumbnails */}
          <div className="mt-4 flex gap-2">
            <button className="border border-red-700 text-red-700 px-4 py-1 text-sm rounded w-full bg-white h-10 text-xs">
              Thêm vào giỏ hàng
            </button>
            <button className="bg-red-700 text-white px-4 py-1 text-sm rounded w-full h-10 text-xs">
              Mua ngay
            </button>
          </div>

          {/* Policy Section */}
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

        {/* Right Section - product Details */}
        <div className="w-2/3">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-gray-600">Tác giả: {product.author}</p>
          <p className="text-gray-600">Nhà xuất bản: Kim Đồng</p>
          <p className="text-gray-600">Bìa: Mềm</p>

          <div className="bg-red-100 p-2 my-2 inline-block text-red-500 font-bold">
            FLASH SALE
          </div>
          <p className="text-red-500 font-bold text-lg">
            {product.originalPrice} đ{" "}
            <span className="line-through text-gray-500">
              {" "}
              {product.currentPrice} đ
            </span>{" "}
            {product.discount * 100}%
          </p>

          {/* Shipping Info */}
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-bold">Thông tin vận chuyển</h3>
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
              <a href="#" className="text-blue-500">
                Xem thêm &rarr;
              </a>
            </h3>
            <div className="flex gap-2 mt-2">
              <div className="p-2 border rounded bg-yellow-200">
                Mã giảm 10k - toàn quốc
              </div>
              <div className="p-2 border rounded bg-yellow-200">
                Mã giảm 25k - toàn quốc
              </div>
              <div className="p-2 border rounded bg-blue-200">
                Home Credit: giảm...
              </div>
              <div className="p-2 border rounded bg-blue-200">
                Zalopay: giảm 15%...
              </div>
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
          <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
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

  {/* List of comments */}
  <div className="mt-4 space-y-4">
    {comments.length === 0 ? (
      <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>
    ) : (
      comments.map((comment) => (
        <div key={comment.id} className="border-b pb-2">
          <p className="text-sm text-gray-800">{comment.content}</p>
          <p className="text-xs text-gray-500">
            Người dùng #{comment.userId} - {new Date(comment.dateTime).toLocaleString()}
          </p>
        </div>
      ))
    )}
  </div>
</div>
    </div>
  );
};

export default ProductDetail;
