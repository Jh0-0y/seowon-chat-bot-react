import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/modules/shared/store";
import AppRouter from "@/routes/AppRouter";
import "@/global.css";

if (process.env.NODE_ENV === "development") {
  (async () => {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  })();
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
