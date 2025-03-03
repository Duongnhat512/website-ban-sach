import axios from "../until/customize-axios";

export const callLoginApi = async (email, password) => {
  try {
    const response = await axios.post("/api/v1/auth/sign-in", { email, password });
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetUserToken = async () => {
  try {
    const response = await axios.post("/api/v1/auth/introspect",{token:localStorage.getItem("token")});
    return response;
  } catch (error) {
    console.error(
      "Get user token error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const callLogOut = async () => {
  try {
    const response = await axios.post("/api/v1/auth/sign-out",{token:localStorage.getItem("token")});
    return response;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
}

export const callRegisterApi = async (userData) => {
  try {
    const response = await axios.post("/api/v1/auth/user/create-user", userData);
    return response;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};
export const callSendOtpApi = async (email) => {
  try {
    const response = await axios.post("/api/v1/auth/user/send-otp", { email });
    return response;
  } catch (error) {
    console.error("Send OTP error:", error.response?.data || error.message);
    throw error;
  }
};