const async = require("async");
const rpcws = require("rpc-websockets").Client;
let ws = new rpcws("ws://localhost:4000");

ws.on("open", () => {
	ws.login({ login: "1111", password: "1111" }).then(async (login) => {
		await calculate();
	});
});

async function calculate() {
	console.log(
		"result = " +
			((await ws.call("sum", [
				await ws.call("square", [3]),
				await ws.call("square", [5, 4]),
				await ws.call("mul", [3, 5, 7, 9, 11, 13]),
			])) +
				(await ws.call("fibs", [7])) * (await ws.call("mul", [2, 4, 6])))
	);
}
