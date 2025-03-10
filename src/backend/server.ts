import express, { Request, Response } from "express";
import path from "path";
import { Config } from "../config";
import {
	seekNucleares,
	NuclearesState,
	updateNuclearesState,
	handleSentState,
} from "./nuclearesStatus";

const app = express();

app.use(express.json());

const files = [
	["/", Config.STATIC_PATH + "index.html"],
	["/index.html", Config.STATIC_PATH + "index.html"],
	["/app.js", Config.DIST_PATH + "app.js"],
	["/app.css", Config.DIST_PATH + "app.css"],
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

app.post("/command", (req, res) => {
	handleSentState(req.body);
	res.send();
});

app.listen(Config.PORT, () => {
	console.log(`Server running at http://localhost:${Config.PORT}/`);
});

const update = () => {
	updateNuclearesState();
};
const loop = () => {
	update();
};
seekNucleares();
setInterval(loop, Config.TIME_INTERVAL);
