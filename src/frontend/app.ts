import { Config } from "../config";
import { Reactor, getReactor } from "../reactor";
import { GfxObject } from "./gfxobject";
import { GfxPump } from "./pump";

document.addEventListener("DOMContentLoaded", () => {
	const message = document.createElement("h2");
	message.textContent = "Hello from TypeScript on the Frontend! 💥";
	document.body.appendChild(message);
});

let status: Reactor = getReactor();
let online: boolean = false;

function copyData(dst: any, src: any): void {
  if (typeof dst !== "object" || typeof src !== "object" || dst === null || src === null) {
    return;
  }

  for (const key of Object.keys(src)) {
    if (
      typeof src[key] === "object" &&
      src[key] !== null &&
      typeof dst[key] === "object" &&
      dst[key] !== null
    ) {
      copyData(dst[key], src[key]);
    } else {
      dst[key] = src[key];
    }
  }
}

function updateStatus() {
	const xhr = new XMLHttpRequest();

	xhr.open("GET", "/status", true);

	xhr.onload = function () {
		if (xhr.status == 200) {
			online = true;
			const data = JSON.parse(xhr.responseText);
			copyData(status, data);
		} else {
			online = false;
		}
	};

	xhr.onerror = function () {
		online = false;
	};

	xhr.send();
}

const update = () => {
	updateStatus();
	const element = document.getElementById("status");
	if (element) {
		element.innerHTML = online + "\n" + JSON.stringify(status);
	}
	gfxObjects.forEach((obj) => {
		obj.update();
	});
};
const loop = () => {
	update();
	setTimeout(loop, Config.TIME_INTERVAL);
};

const gfxObjects: GfxObject<HTMLElement>[] = [];
gfxObjects.push(
	new GfxPump(document.body, { x: 0, y: 0 }, status.coolant.pumps[0])
);
gfxObjects.push(
	new GfxPump(document.body, { x: 0, y: 0 }, status.coolant.pumps[1])
);
gfxObjects.push(
	new GfxPump(document.body, { x: 0, y: 0 }, status.coolant.pumps[2])
);

loop();
