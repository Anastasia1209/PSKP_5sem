const WebSocket = require("ws");
const WS_PORT = 4000;

const ws_server = new WebSocket.Server(
	{ port: WS_PORT, host: "localhost", path: "/broadcast" },
	() => {
		console.log(`WebSocket-server started http://localhost:${WS_PORT}`);
	}
);

ws_server.on("connection", (ws) => {
	ws.on("message", (message) => {
		console.log(`Client sended - ${message.toString()}`);
		ws_server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});

	ws.onclose = (event) => console.log(event.code, event.reason);
});
