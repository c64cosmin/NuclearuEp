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

const files = [
  ["/", Config.STATIC_PATH + Config.INDEX_HTML],
  ["/index.html", Config.STATIC_PATH + Config.INDEX_HTML],
  ["/app.js", Config.JS_PATH],
];

const serveFile = (urlpath: string, filepath: string) => {
  const handle = (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, filepath));
  };
  app.get(urlpath, handle);
};

files.forEach(([urlpath, filepath]) => {
    serveFile(urlpath, filepath);
});

app.get("/status", (_: Request, res: Response) => {
  res.send(JSON.stringify(NuclearesState));
});

app.use(
  "/img",
  express.static(path.join(__dirname, Config.STATIC_PATH, Config.IMAGE_PATH)),
);

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
