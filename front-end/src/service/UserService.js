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
export const callGetUserToken = async () => {
  try {
    const response = await axios.post("/auth/introspect",{token:localStorage.getItem("token")});
    return response;
  } catch (error) {
    console.error(
      "Get user token error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
