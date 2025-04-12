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
