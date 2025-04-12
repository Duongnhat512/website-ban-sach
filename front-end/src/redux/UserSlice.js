import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  role: null,
  authenticated: false,
  user: {
    id: "",
    email: "",
    fullName: "",
    dob: "",
    phoneNumber: "",
  },
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.authenticated = action.payload.authenticated;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.authenticated = action.payload.valid;
      state.role = action.payload.scope;
      state.user = action.payload.user;
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.authenticated = false;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { loginSuccess, setUser, logout } = userSlice.actions;
