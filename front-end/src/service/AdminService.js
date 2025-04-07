import axios from "../until/customize-axios";

export const callGetTotalUser = async () => {
  try {
    const response = await axios.get("/api/v1/auth/user/total-user");
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const callGetTotalProduct = async () => {
  try {
    const response = await axios.get("/api/v1/books/total-book");
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const callGetTotalCategories = async () => {
  try {
    const response = await axios.get("/api/v1/books/categories/total");
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const callGetTotalOrder = async () => {
  try {
    const response = await axios.get("/api/v1/orders/total-order");

    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const callGetAllCate =async (limit, page, sortBy, sortOrder) => {
  try {
    const response = await axios.get(`/api/v1/books/categories/all?&size=${limit}&page=${page}&sort=${sortBy}:${sortOrder}`)
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
}