import express, { Request, Response } from "express";
import path from "path";
import Config from "./config";

const app = express();
const PORT = Config.PORT;

//app.use(express.static(path.join(__dirname, "../static")));

app.get("/", (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../static/index.html"));
});

app.get("/js/*", (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../dist/frontend/app.js"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
