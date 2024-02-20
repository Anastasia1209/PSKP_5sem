const send = require("lab5gay");
//const send = require("./05_GAY");
const http = require("http");
const fs = require("fs");
const url = require("url");
const Emitter = require("events");
const emitter = new Emitter();

emitter.on("POST", (request, response) => {
	console.log("POST.MESSAGE");
	request.on("data", (data) => {
		let temp = JSON.parse(data);
		send(temp.sender, temp.senderPass, temp.receiver, temp.message);
		response.end(JSON.stringify(temp));
	});
});

http
	.createServer((request, response) => {
		let html = fs.readFileSync("index.html");
		if (url.parse(request.url).pathname === "/") {
			response.writeHead(200, { "Context-type": "text/html; charset=utf-8" });
			response.end(html);
		} else if (url.parse(request.url).pathname === "/send") {
			emitter.emit(request.method, request, response);
		}
	})
	.listen(5000, console.log("Server is running"));

//artsynek@gmail.com
//fpikpjrsyevgepqd
