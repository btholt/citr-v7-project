import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
