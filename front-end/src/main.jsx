import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import ChatBox from "./page/ChatPage/ChatBox/ChatBox.jsx";
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChatBox />
      <App />
    </PersistGate>
  </Provider>
);
