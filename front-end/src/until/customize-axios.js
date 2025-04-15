import axios from "axios";

const baseURL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8888";
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Để gửi cookie nếu backend dùng
});

// ✅ Hàm cập nhật token
export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

const NO_RETRY_HEADER = "x-no-retry";

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = instance.defaults.headers.common["Authorization"];
    if (!token && config.url.includes("/protected-endpoint")) {
      console.warn("Không có token! Request này yêu cầu xác thực.");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  async function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized! Token có thể đã hết hạn.");
          let originalRequest = error.config;

          // Nếu request chưa được retry
          if (!originalRequest._retry) {
            originalRequest._retry = true;

            // Thử làm mới token
            try {
              const refreshToken = localStorage.getItem("refreshToken");
              if (refreshToken) {
                const response = await axios.post(`${baseURL}/auth/refresh`, {
                  refreshToken,
                });
                const newToken = response.data.token;

                // Cập nhật token mới
                setAuthToken(newToken);
                localStorage.setItem("token", newToken);

                // Gửi lại request ban đầu
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return instance(originalRequest);
              } else {
                console.warn(
                  "Không có refresh token. Điều hướng đến trang login."
                );
                window.location.href = "/login";
              }
            } catch (refreshError) {
              console.error("Làm mới token thất bại:", refreshError);
              window.location.href = "/login";
            }
          }
          break;

        case 404:
          console.error("Không tìm thấy tài nguyên.");
          break;

        case 500:
          console.error("Lỗi server. Vui lòng thử lại sau.");
          break;

        default:
          console.error("Đã xảy ra lỗi:", error.response.status);
      }
    } else if (!error.config.headers[NO_RETRY_HEADER]) {
      console.error("Không thể kết nối đến server:", error.message);
    } else {
      console.error("Lỗi không xác định:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
