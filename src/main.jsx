import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { root } from "./root/index.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={root} />
    </Provider>
  </StrictMode>
);
