import * as http from "http";
import { Config } from "../config";
import { Reactor, getReactor } from "../reactor";
import { NuclearesPaths } from "./nucleares";

export let NuclearesState: Reactor = getReactor();

export function updateNuclearesState() {
	if (NuclearesState.online) {
		for (const variable in NuclearesPaths) {
			doRequest(variable, NuclearesPaths[variable]);
		}
	}
	for (let i = 0; i < 3; i++) {
		NuclearesState.coolant.pumps[i].speed = Math.floor(Math.random() * 100);
		NuclearesState.coolant.pumps[i].dryStatus = Math.floor(Math.random() * 2);
		NuclearesState.coolant.pumps[i].overloadStatus = Math.floor(
			Math.random() * 2,
		);
	}
}

export function seekNucleares() {
	const pingFunction = () => {
		const path = `http://${Config.NUCLEARES_PATH}:${Config.NUCLEARES_PORT}`;
		http
			.get(path, (_) => {
				NuclearesState.online = true;
			})
			.on("error", () => {
				NuclearesState.online = false;
			});
	};

	pingFunction();
	setInterval(pingFunction, 30000);
}

function doRequest(variable: string, path: (string | number)[]) {
	const options = {
		hostname: Config.NUCLEARES_PATH,
		port: Config.NUCLEARES_PORT,
		path: "/?variable=" + variable,
		method: "GET",
	};

	const req = http.request(options, (res) => {
		let data = "";

		res.on("data", (chunk) => {
			data += chunk;
		});

		res.on("end", () => {
			let value: any = data;

			const state = NuclearesState as any;
			const n = path.length;
			let entry = state[path[0]];
			for (let i = 1; i < n - 1; i++) {
				entry = entry[path[i]];
			}

			const positives = ["TRUE", "REACTIVO", "CIRCULANDO"];
			const negatives = ["FALSE", "NOREACTIVO", "INMOVIL"];

			if (positives.includes(value)) value = "1";
			if (negatives.includes(value)) value = "0";

			//is not time
			if (!value.includes(":")) {
				value = Number(value);
			}

			entry[path[n - 1]] = value;
		});

		res.on("error", () => {
			NuclearesState.online = false;
		});
	});

	req.end();
}
