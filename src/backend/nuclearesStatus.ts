import * as http from "http";
import { Config } from "../config";
import { ControlableReactor, Reactor, getReactor } from "../reactor";
import { NuclearesPaths } from "./nucleares";

export let NuclearesState: Reactor = getReactor();

export function updateNuclearesState() {
	if (NuclearesState.online) {
		for (const variable in NuclearesPaths) {
			doRequest(variable, NuclearesPaths[variable]);
		}
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

export function handleSentState(state: ControlableReactor) {
	if (!NuclearesState.online) {
		return;
	}
	sendCommand("RODS_POS_ORDERED", state.rods);
}

function doRequest(variable: string, path: (string | number)[]) {
	const options = {
		hostname: Config.NUCLEARES_PATH,
		port: Config.NUCLEARES_PORT,
		path: `/?variable=${variable}`,
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

			const positives = ["true", "TRUE", "REACTIVO", "CIRCULANDO"];
			const negatives = ["false", "FALSE", "NOREACTIVO", "INMOVIL"];

			if (positives.includes(value)) value = "1";
			if (negatives.includes(value)) value = "0";

			//is not time
			if (!value.includes(":")) {
				value = Number(value);
			}

			entry[path[n - 1]] = value;
		});
	});

	req.on("error", () => {
		NuclearesState.online = false;
	});

	req.end();
}

function sendCommand(variable: string, value: number) {
	const data = "";

	const options = {
		hostname: Config.NUCLEARES_PATH,
		port: Config.NUCLEARES_PORT,
		path: `/?variable=${variable}&value=${value}`,
		method: "POST",
	};

	const req = http.request(options, (res) => {
		let responseData = "";

		res.on("data", (chunk) => {
			responseData += chunk;
		});

		res.on("end", () => {});
	});

	req.on("error", (error) => {
		console.error("Error:", error);
	});

	req.write(data);
	req.end();
}
