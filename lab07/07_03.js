let http = require("http");
let query = require("qs");

let params = query.stringify({ x: 5, y: 7, s: "Nastya" });
console.log("params", params);

let options = {
	host: "localhost",
	path: `/3?${params}`,
	port: 5000,
	method: "POST",
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
req.write(params);
req.end();
