const http = require("http");
const readline = require("readline");

let currentState = "norm";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function handleUserInput() {
	rl.question("Enter new state (norm, stop, test, idle): ", (input) => {
		const newState = input.trim().toLowerCase();

		if (["norm", "stop", "test", "idle"].includes(newState)) {
			currentState = newState;
		} else {
			console.log("Invalid state. Enter norm, stop, test, idle.");
		}

		handleUserInput();
	});
}
handleUserInput();
http
	.createServer(function (request, response) {
		response.writeHead(200, { "Content-Type": "text/html" });
		response.write(currentState);
		response.end();
	})
	.listen(5000, () => {
		console.log("Server running at http://localhost:5000/");
	});
