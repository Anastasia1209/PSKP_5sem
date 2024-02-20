const http = require("http");
const fs = require("fs");

let bound = "hello";
let body = `--${bound}\r\n`;
body +=
	'Content-Disposition: form-data; name="pngUpload"; filename="photo.jpg"\r\n';
body += "Content-Type: text/plain\r\n\r\n";
body += fs.readFileSync("photo.jpg");
body += `\r\n--${bound}--`;

let options = {
	host: "localhost",
	path: "/6",
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
	resp.on("end", () => console.log("end: ", data));
});

req.on("error", (e) => console.log(e.message));
req.end(body);
