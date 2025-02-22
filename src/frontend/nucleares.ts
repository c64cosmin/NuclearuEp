import { Config } from "../config";
import { copyData } from "../utils";
import { Reactor, getReactor } from "../reactor";

const reactorState: Reactor = getReactor();
let serverOnline: boolean = false;

export function startNucleares(
	callback: (online: boolean, state: Reactor) => void,
) {
	const update = () => {
		updateStatus(callback);
	};

	update();
	setInterval(update, Config.TIME_INTERVAL);
}

function updateStatus(
	callback: (online: boolean, state: Reactor) => void,
) {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", "/status", true);

	xhr.onload = function () {
		if (xhr.status == 200) {
			serverOnline = true;
			const data = JSON.parse(xhr.responseText);
			copyData(reactorState, data);
			callback(serverOnline, reactorState);
		} else {
			serverOnline = false;
		}
	};

	xhr.ontimeout = function () {
		serverOnline = false;
	};

	xhr.onerror = function () {
		serverOnline = false;
	};

	xhr.send();
}
