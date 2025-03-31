import React, { useEffect } from "react";
import { useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { callGetUserToken } from "../../service/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/UserSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Oauth2 = () => {
  const navigate = useNavigate();
  const pathParams = useParams();
  const [query] = useSearchParams();
  const dispatch = useDispatch();

  const fetchInfo = useCallback(async () => {
    const userResponse = await callGetUserToken();
    console.log("aaaaaaaaa" + userResponse);
    dispatch(setUser(userResponse.result));
    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const clientCode = pathParams.clientCode;
    console.log(clientCode);

    const handleResponse = async (response) => {
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      const token = data.token;
      localStorage.setItem("token", token);
      fetchInfo();
    };

    const handleError = (error) => {
      console.error("There was a problem with the fetch operation:", error);
    };

    if (clientCode === "github") {
      fetch(
        `http://localhost:8080/login/oauth2/code/github?${query.toString()}`,
        {
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then(handleResponse)
        .catch(handleError);
    } else if (clientCode === "facebook") {
      fetch(
        `http://localhost:8080/login/oauth2/code/facebook?${query.toString()}`,
        {
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then(handleResponse)
        .catch(handleError);
    } else if (clientCode === "google") {
      fetch(
        `http://localhost:8888/login/oauth2/code/google?${query.toString()}`,
        {
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      )
        .then((data) => {
          console.log(data);
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const token = data.token;
          localStorage.setItem("token", token);
          console.log("====================================");
          console.log(token);
          console.log("====================================");
        })
        .catch(handleError);
    }
  }, [fetchInfo, navigate, pathParams.clientCode, query]);

  return (
    <div className="container text-center">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        <h2 className="mt-3">Processing...</h2>
        <p className="text-muted">
          Please wait while we authenticate your account.
        </p>
      </div>
      <style>
        {`
        body {
          background-color: #f8f9fa;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .spinner-border-custom {
          width: 4rem;
          height: 4rem;
          border-width: 0.4em;
        }
      `}
      </style>
    </div>
  );
};

export default Oauth2;
