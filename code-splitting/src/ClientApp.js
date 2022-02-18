import { hydrateRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App isBrowser={true} assets={window.assetManifest} />
  </BrowserRouter>
);
