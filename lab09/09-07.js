const rpcServer = require("rpc-websockets").Server;
const server = new rpcServer({ port: 4000, host: "localhost" });

server
	.register("A", () => {
		console.log("A notify");
	})
	.public();
server
	.register("B", () => {
		console.log("B notify");
	})
	.public();
server
	.register("C", () => {
		console.log("C notify");
	})
	.public();
