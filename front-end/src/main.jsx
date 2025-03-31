import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ChatBox from "./page/ChatPage/ChatBox/ChatBox.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ChatBox />
      <App />
    </Provider>
  </StrictMode>
);
