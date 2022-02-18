import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();
app.use("/frontend", express.static("dist/frontend"));
app.use("/styles", express.static("dist/styles"));

app.use((req, res) => {
  const assets = {
    "ClientApp.js": "/frontend/ClientApp.js",
    "style.css": "/styles/style.css",
  };
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App assets={assets} isBrowser={false} />
    </StaticRouter>
  );

  let didError = false;
  const { pipe, abort } = renderToPipeableStream(reactMarkup, {
    bootstrapScripts: [assets["ClientApp.js"]],
    onCompleteShell() {
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      pipe(res);
    },
    onError(err) {
      didError = true;
      console.error("server error", req.url, err);
    },
  });

  setTimeout(abort, 5000);
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
