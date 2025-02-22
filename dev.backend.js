const { spawn } = require("child_process");
const fs = require("fs");

let serverProcess;

function startServer() {
    if (serverProcess) {
        serverProcess.kill();
    }

    console.log("🔄 Restarting server...");
    serverProcess = spawn("node", ["./dist/backend/backend/server.js"], { stdio: "inherit" });
}

fs.watch("./dist", { recursive: true }, (_, filename) => {
    if (filename) {
        startServer();
    }
});

startServer();
