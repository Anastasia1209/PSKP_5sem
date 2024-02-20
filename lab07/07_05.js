const http = require("http");
const xmlBuilder = require("xmlbuilder");
const parseString = require("xml2js").parseString;

const doc = xmlBuilder.create("request").att("id", 300);
doc.ele("x").att("value", 6);
doc.ele("x").att("value", 4);
doc.ele("x").att("value", 7);
doc.ele("m").att("value", "n");
doc.ele("m").att("value", "a");
doc.ele("m").att("value", "s");
doc.ele("m").att("value", "t");
doc.ele("m").att("value", "y");
doc.ele("m").att("value", "a");

let options = {
	host: "localhost",
	path: `/5`,
	port: 5000,
	method: "POST",
	headers: { "Content-Type": "text/xml" },
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
req.end(doc.toString({ pretty: true }));
