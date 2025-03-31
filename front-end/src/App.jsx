import { useEffect } from "react";
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
import Cart from "./page/Cart/Cart";
import UserInfo from "./page/InfoUser";
import Chatbox from "./page/ChatPage/ChatBox/ChatBox.jsx";

import Oauth2 from "./page/Login/Oauth2";
import PaymentSuccess from "./page/Payment/PaymentSuccess.jsx";
import PaymentFailure from "./page/Payment/PaymentFailure.jsx";
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/info" element={<UserInfo />} />
          <Route path="/payment-failed" element={<PaymentFailure/>} />
          <Route path="/payment-success" element={<PaymentSuccess/>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/admin" element={<LayoutAdmin />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/oauth2/callback/:clientCode" element={<Oauth2 />} />
        <Route path="/chatBox" element={<Chatbox />} />
      </Routes>
    </Router>
  );
}

export default App;
