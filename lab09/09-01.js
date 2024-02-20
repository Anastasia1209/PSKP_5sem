const WebSocket = require("ws");
const fs = require("fs");
const WS_PORT = 4000;

const ws_server = new WebSocket.Server(
	{ port: WS_PORT, host: "localhost", path: "/fileUpload" },
	() => {
		console.log(`WebSocket-server started http://localhost:${WS_PORT}`);
	}
);

ws_server.on("connection", (ws) => {
	const duplex = WebSocket.createWebSocketStream(ws);

	const fileName = `./into/file_new`;

	let downloaded = fs.createWriteStream(fileName);
	duplex.pipe(downloaded);

	console.log(`\nFile downloaded to ${fileName}`);

	ws.onclose = (event) => console.log(event.code, event.reason);
});
