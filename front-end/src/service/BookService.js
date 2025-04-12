import axios from "../until/customize-axios";

export const callGetBook = async (page, size, sort = "id", order = "asc") => {
  try {
    const response = await axios.get(`/api/v1/books/get-all-books?page=${page}&size=${size}&sort=${sort}:${order}`);
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetABook = async (id) => {
  try {
    const response = await axios.get(`/api/v1/books/${id}`, { params: { id } });
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};

export const callGetBookFilter = async (page, size, sort, search) => {
  try {
    const url = `/api/v1/books/search-by-keyword?page=${page}&size=${size}&sort=${sort}&search=${search}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetAllBooks = async (limit, page, sortBy, sortOrder) => {
  try {
    const response = await axios.get(
      `/api/v1/books/get-all-books?size=${limit}&page=${page}&sort=${sortBy}:${sortOrder}`
    );
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`/api/v1/books/${id}`);
    console.log(response.result);
    return response.result;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};
export const callGetBookFlashSale = async () => {
  try {
    const response = await axios.get("/api/v1/books/flash-sale");
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetBookByCategory = async (
  categoryName,
  page = 1,
  size = 5
) => {
  try {
    const response = await axios.get(
      `/api/v1/books/search-by-category?category=${categoryName}&page=${page}&size=${size}`
    );
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};
export const callUploadThumbnail = async (bookId, file) => {
  console.log("bookId:", bookId);
  console.log("file:", file);

  // Tạo FormData và thêm file với key là "image"
  const formData = new FormData();
  formData.append("image", file); // Key là "image", value là file

  try {
    const response = await axios.post(`/api/v1/books/upload-image/${bookId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo header đúng
      },
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi upload thumbnail:", error.response?.data || error.message);
    throw error;
  }
};