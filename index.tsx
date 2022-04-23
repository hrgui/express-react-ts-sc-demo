import express from "express";
import { App } from "./components/App";
import ReactDOM from "react-dom/server";
import Html from "./components/Html";

const app = express();

app.get("/", (req, res) => {
  // const str = ReactDOM.renderToString(<App />);
  // res.send(str);
  res.socket?.on("error", (error) => {
    console.error("Fatal", error);
  });

  let didError = false;
  const { pipe } = ReactDOM.renderToPipeableStream(
    <Html>
      <App />
    </Html>,
    {
      // bootstrapScripts: [assets["main.js"]],
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onShellError(x) {
        didError = true;
        console.error(x);
      },
    }
  );
});

app.listen(3000);
