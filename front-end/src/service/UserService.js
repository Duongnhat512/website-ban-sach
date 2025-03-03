import axios from "../until/customize-axios";

export const callLoginApi = async (email, password) => {
    try {
      const response = await axios.post("/auth/sign-in", { email, password });
      return response;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };