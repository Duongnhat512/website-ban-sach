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
export const callGetAllCate =async (limit=100, page=1, sortBy="id", sortOrder="asc") => {
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
export const callGetBookById = async (id) => {
  try {
    const response = await axios.get(`/api/v1/books/${id}`);
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
}
export const callDeleteBookById = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/books/delete/${id}`);
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
}
export const callUpdateBookById = async (id, data) => {
  try {
    const response = await axios.put(`/api/v1/books/update/${id}`, data);
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
}
export const callCreateBook = async (data) => {
  try {
    const response = await axios.post(`/api/v1/books/create-book`, data);
    console.log(response);
    
    return response;
  } catch (error) {
    console.error(
      "Get total user error:",
      error.response?.data || error.message
    );
    throw error;
  }
}