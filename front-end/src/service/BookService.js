import axios from "../until/customize-axios";

export const callGetBook = async (page, size) => {
  try {
    const response = await axios.get("/api/v1/books/get-all-books", { params: { page, size } });
    return response;
  } catch (error) {
    console.error("Get books error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetABook = async (id) => {
  try {
    const response = await axios.get(`/api/v1/books/${id}`, { params: {id} });
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

