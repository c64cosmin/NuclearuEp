import { Config } from "../config";
import { Reactor, getReactor } from "../reactor";

document.addEventListener("DOMContentLoaded", () => {
  const message = document.createElement("h2");
  message.textContent = "Hello from TypeScript on the Frontend! 💥";
  document.body.appendChild(message);
});

let status: Reactor = getReactor();
let online: boolean = false;

function updateStatus() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/status", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      online = true;
      const data = JSON.parse(xhr.responseText);
      status = data;
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
};
const loop = () => {
  update();
  setTimeout(loop, Config.TIME_INTERVAL);
};
loop();
