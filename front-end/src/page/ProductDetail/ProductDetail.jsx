import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
    const product = {
      title: "Mẫu Giáo Đại Chiến - Tập 4 - Bản Đặc Biệt",
      author: "You Chiba",
      price: 42000,
      originalPrice: 60000,
      publisher: "IPM",
      releasedDate: "2025-02-15",
      quantity: 105,
      description:
        "Tiếp diễn trận đấu ở tập trước, cả Doug và Hana cùng phải trực tiếp đối đầu với Leo...",
    };
  
    return (
      <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img
            src="http://localhost:3000/src/assets/images/product1.png"
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
  
        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">Tác giả: {product.author}</p>
          <p className="text-gray-600">Nhà xuất bản: {product.publisher}</p>
          <p className="text-gray-600">Ngày phát hành: {product.releasedDate}</p>
          <p className="text-gray-600">Số lượng còn: {product.quantity}</p>
          <p className="text-red-500 text-xl font-bold mt-2">
            {product.price.toLocaleString()}đ{" "}
            <span className="text-gray-500 line-through">
              {product.originalPrice.toLocaleString()}đ
            </span>
          </p>
          <p className="bg-red-500 text-white px-2 py-1 inline-block mt-2">
            Flash Sale
          </p>
  
          {/* Mô tả sản phẩm */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Mô tả sản phẩm</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
  
          {/* Nút Mua hàng */}
          <div className="mt-4 flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Mua ngay
            </button>
            <button className="border px-4 py-2 rounded">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    );
  
  // return (
  //   <div>
  //     <h1>Chi tiết sản phẩm</h1>
  //     <p>ID sản phẩm: {id}</p>
  //   </div>
  // );
}

export default ProductDetail;
