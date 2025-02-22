const { execSync, spawn } = require("child_process");
const fs = require("fs");

let serverProcess;
let timeoutHandler;

function startServer() {
	if (serverProcess) {
		serverProcess.kill();
	}

	console.log("🔄 Compiling...");
    try{
	execSync("npm run build", { stdio: "inherit" });
    }catch(_){ };
	console.log("🔄 Restarting server...");
	serverProcess = spawn("node", ["./dist/backend/backend/server.js"], {
		stdio: "inherit",
	});
}

fs.watch("./src", { recursive: true }, (_, filename) => {
	if (filename) {
		if (timeoutHandler) {
			clearTimeout(timeoutHandler);
		}
		timeoutHandler = setTimeout(startServer, 300);
	}
});

startServer();
