import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutUser from "./component/LayoutUser/LayoutUser";
import LayoutAdmin from "./component/LayoutAdmin/LayoutAdmin";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import HomePage from "./page/Home/HomePage";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import { useDispatch } from "react-redux";
import { callGetUserToken } from "./service/UserService";
import { setUser } from "./redux/UserSlice";
import ProductDetail from "./page/ProductDetail/ProductDetail";
import Filter from "./page/Filter/Filter";
import Banner1 from "./page/HomeBanner/Banner1";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await callGetUserToken();
        dispatch(setUser(response.result));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/Banner1" element={<Banner1 />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/admin" element={<LayoutAdmin />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
