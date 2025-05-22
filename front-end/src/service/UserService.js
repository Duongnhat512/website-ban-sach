import axios from "../until/customize-axios";

export const callLoginApi = async (email, password) => {
  try {
    const response = await axios.post("/api/v1/auth/sign-in", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
export const callGetUserToken = async () => {
  try {
    const response = await axios.post("/api/v1/auth/introspect", {
      token: localStorage.getItem("token"),
    });
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
    const response = await axios.post("/api/v1/auth/sign-out", {
      token: localStorage.getItem("token"),
    });
    return response;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};

export const callRegisterApi = async (userData, otp) => {
  try {
    const response = await axios.post(
      `/api/v1/auth/user/create-user?otp=${otp}`,
      userData
    );
    return response;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};
export const callSendOtpApi = async (email) => {
  try {
    const response = await axios.post("/api/v1/auth/user/send-otp-register", {
      email,
    });
    return response;
  } catch (error) {
    console.error("Send OTP error:", error.response?.data || error.message);
    throw error;
  }
};

export const callGetAllUsers = async (limit, page, sortBy,sortOrder) => {
  try {
    const response = await axios.get(
      `/api/v1/auth/user/get-all-users?size=${limit}&page=${page}&sort=${sortBy}:${sortOrder}`
    );
    return response;
  } catch (error) {
    console.error("Get all users error:", error.response?.data || error.message);
    throw error;
  }
}
export const callUpdateUser = async (userId, userData) => {
  try {
    const response = await axios.put(
      `/api/v1/auth/user/update/${userId}`,
      userData
    );
    return response;
  } catch (error) {
    console.error("Update user error:", error.response?.data || error.message);
    throw error;
  }
};