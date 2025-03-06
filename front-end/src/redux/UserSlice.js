import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  authenticated: false,
  user: {
    id: "",
    email: "",
    fullName: "",
    dob: "",
    phoneNumber:"",
  },
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.authenticated = action.payload.authenticated;
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.authenticated = action.payload.valid;
      state.role = action.payload.scope;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.authenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, setUser, logout } = userSlice.actions;

