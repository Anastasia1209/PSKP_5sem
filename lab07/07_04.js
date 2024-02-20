const http = require("http");

const json = JSON.stringify({
	__comment: "Request. Lab09",
	x: 1,
	y: 2,
	s: "Message",
	m: ["N", "a", "s", "t", "y", "a"],
	o: { surname: "Golodok", name: "Nastya" },
});

let options = {
	host: "localhost",
	path: `/4`,
	port: 5000,
	method: "POST",
	headers: { "Content-Type": "application/json" },
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
req.end(json);
