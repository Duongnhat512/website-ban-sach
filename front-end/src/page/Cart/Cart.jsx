import React from "react";
import { useSelector } from "react-redux";
import { Button, Card } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import Cart_Empty from "../../assets/images/ico_emptycart.svg";
import { useNavigate } from "react-router-dom";

function Cart() {
  const orders = useSelector((state) => state.order.orders); // Lấy dữ liệu đơn hàng từ Redux store
  const navigate = useNavigate();

  return (
    <div className="cart-container bg-gray-100 py-10">
      {orders.length === 0 ? (
        <div className=" shadow-lg rounded-lg bg-white flex flex-col items-center justify-center max-w-[1200px] w-full mx-auto "> 
          <Card className="w-full  " bordered={false}>
            <h2 className="text-xl font-semibold mb-4">
              GIỎ HÀNG <span className="text-gray-500">(0 sản phẩm)</span>
            </h2>
            <div className="flex flex-col items-center text-center">
              <img src={Cart_Empty} alt="Empty Cart" className="w-32 mb-4" />
              <p className="text-gray-500 mb-6">
                Chưa có sản phẩm trong giỏ hàng của bạn.
              </p>
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg"
                onClick={() => navigate("/")}
              >
                MUA SẮM NGAY
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <p>Có sản phẩm trong giỏ hàng</p>
      )}
    </div>
  );
}

export default Cart;
