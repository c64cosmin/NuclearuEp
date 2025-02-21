import { Reactor, getReactor } from "../reactor";

document.addEventListener("DOMContentLoaded", () => {
  const message = document.createElement("h2");
  message.textContent = "Hello from TypeScript on the Frontend! 💥";
  document.body.appendChild(message);
});

let status: Reactor = getReactor();

function updateStatus() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/status", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      status = data;
    }
  };
  xhr.send();
}

const update = () => {
    updateStatus();
  const element = document.getElementById("status");
  if (element) {
    element.innerHTML = JSON.stringify(status);
  }
};
const loop = () => {
  update();
  setTimeout(loop, 3000);
};
loop();
