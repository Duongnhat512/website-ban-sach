import axios from "../until/customize-axios";

export const chatWithGeminiAI = async (interest) => {
  try {
    const response = await axios.get(`api/v1/books/suggest`, {
      params: { interest: interest },
    });
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    return response; // Chỉ trả về dữ liệu thực sự
  } catch (error) {
    console.error(error);
    return "Lỗi khi gọi Gemini AI"; // Trả về một chuỗi để tránh lỗi React
  }
};
