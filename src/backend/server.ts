import express, { Request, Response } from "express";
import path from "path";
import { Config } from "../config";
import {
  seekNucleares,
  NuclearesState,
  updateNuclearesState,
} from "./nuclearesStatus";

const app = express();
const PORT = Config.PORT;

const serveHtml = (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, Config.STATIC_PATH, Config.INDEX_HTML));
};

const serveJs = (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, Config.JS_PATH));
};

const serveStatus = (_: Request, res: Response) => {
  res.send(JSON.stringify(NuclearesState));
};

const serveImages = express.static(
  path.join(__dirname, Config.STATIC_PATH, Config.IMAGE_PATH),
);

app.get("/", serveHtml);
app.get("/index.html", serveHtml);
app.get("/app.js", serveJs);
app.get("/status", serveStatus);
app.use("/img", serveImages);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

const update = () => {
  updateNuclearesState();
};
const loop = () => {
  update();
};
seekNucleares();
setInterval(loop, Config.TIME_INTERVAL);
