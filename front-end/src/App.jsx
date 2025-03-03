import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutUser from "./component/LayoutUser/LayoutUser";
import LayoutAdmin from "./component/LayoutAdmin/LayoutAdmin";
import ErrorPage from "./component/ErrorPage/ErrorPage";
import HomePage from "./page/Home/HomePage";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import { useDispatch } from "react-redux";
import { callGetUserToken } from "./service/UserService";
import { setUser } from "./redux/UserSlice";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      errorElement: <ErrorPage />,
      children: [{ index: true, path: "/", element: <HomePage /> }],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
    },
  ]);
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
