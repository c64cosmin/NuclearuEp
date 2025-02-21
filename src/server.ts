import express, { Request, Response } from "express";
import path from "path";
import { Config } from "./config";
import { NuclearesState, updateNuclearesState } from "./nuclearesStatus";

const app = express();
const PORT = Config.PORT;

const serveHtml = (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, Config.HTML_PATH));
};

const serveJs = (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, Config.JS_PATH));
};

const serveStatus = (_: Request, res: Response) => {
  res.send(JSON.stringify(NuclearesState));
};

app.get("/", serveHtml);
app.get("/index.html", serveHtml);
app.get("/app", serveJs);
app.get("/status", serveStatus);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

const update = () => {
  updateNuclearesState();
};
const loop = () => {
  update();
  setTimeout(loop, Config.TIME_INTERVAL);
};
loop();
