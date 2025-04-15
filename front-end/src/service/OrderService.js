import axios from "../until/customize-axios";

export const callCreateOrder = async (data) => {
  try {
    const response = await axios.post("/api/v1/orders/create", data);
    return response;
  } catch (error) {
    console.error("Create order error:", error.response?.data || error.message);
    throw error;
  }
};
