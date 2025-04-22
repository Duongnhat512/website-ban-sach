import axios from "../until/customize-axios";
export const callGetAllOrder = async (
  page,
  size,
  sort = "id",
  order = "asc"
) => {
  try {
    const response = await axios.get(
      `/api/v1/orders/get-all-orders?page=${page}&size=${size}&sort=${sort}:${order}`
    );
    return response;
  } catch (error) {
    console.error("Get orders error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetDetaiOrder = async (id) => {
  try {
    const response = await axios.get(`/api/v1/order-detail/${id}`);
    return response;
  } catch (error) {
    console.error("Get orders error:", error.response?.data || error.message);
    throw error;
  }
};

export const callCreateOrder = async (data) => {
  try {
    const response = await axios.post("/api/v1/orders/create-order", data);
    return response;
  } catch (error) {
    console.error("Create order error:", error.response?.data || error.message);
    throw error;
  }
}

export const callGetOrderByUserId = async (id) => {
  try {
    const response = await axios.get(`/api/v1/orders/get-orders-by-user/${id}?page=1&size=30&sort=id:asc`);
    return response;
  } catch (error) {
    console.error("Get orders error:", error.response?.data || error.message);
    throw error;
  }
}
