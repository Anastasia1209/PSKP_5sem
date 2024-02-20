const http = require("http");
const fs = require("fs");
const { buffer } = require("node:stream/consumers");

let bound = "qweqweqwe";
let body = `--${bound}\r\n`;
body +=
	'Content-Disposition: form-data; name="pngUpload"; filename="photo.jpg"\r\n';
body += "Content-Type: application/octet-stream\r\n\r\n";

let options = {
	host: "localhost",
	path: "/7",
	port: 5000,
	method: "POST",
	headers: { "Content-Type": `multipart/form-data; boundary=${bound}` },
};

const req = http.request(options, (resp) => {
	console.log("resp.statusCode= ", resp.statusCode);
	let data = "";
	resp.on("data", (chunk) => {
		console.log("data= ", (data += chunk.toString()));
	});
	resp.on("end", () => {
		console.log("end: ", data);
		console.log(`body length: ${Buffer.byteLength(data)}\n)`);
	});
});

req.write(body);
let stream = new fs.ReadStream("photo.jpg");
stream.on("data", (chunk) => {
	req.write(chunk);
	console.log("chunk length= ", Buffer.byteLength(chunk));
});
stream.on("end", () => req.end(`\r\n--${bound}--`));
req.on("error", (e) => console.log(e.message));
