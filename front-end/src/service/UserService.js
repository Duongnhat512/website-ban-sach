import axios from "../until/customize-axios";

export const callLoginApi = (email, password) => {
  return axios.post("/api/v1/auth/sign-in", { email, password });
};