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