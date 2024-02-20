const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:4000/broadcast");
ws.onmessage = (message) => {
	console.log(message.data.toString());
};

let countMessages = 0;
setInterval(() => {
	ws.send(`Client: ${countMessages++}`);
}, 3000);
