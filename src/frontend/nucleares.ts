import { Config } from "../config";
import { copyData } from "../utils";
import { Reactor, getReactor } from "../reactor";

const reactorState: Reactor = getReactor();
let serverOnline: boolean = false;

export function startNucleares(
  callback: (online: boolean, state: Reactor) => void,
) {
  const update = () => {
    updateStatus();
    callback(serverOnline, reactorState);
  };

  setInterval(update, Config.TIME_INTERVAL);
}

function updateStatus() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/status", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      serverOnline = true;
      const data = JSON.parse(xhr.responseText);
      copyData(reactorState, data);
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
