var http = require("http");
var url = require("url");
const f = "fact";

var factorial = (x) => {
	if (x < 0) return "<0";
	else if (x == 0 || x == 1) return 1;
	else return factorial(x - 1) * x;
};

http
	.createServer(function (req, resp) {
		if (
			url.parse(req.url).pathname === "/" + f &&
			typeof url.parse(req.url, true).query.k != "undefined"
		) {
			var k = parseInt(url.parse(req.url, true).query.k);
			if (Number.isInteger(k)) {
				console.log(k);
				resp.writeHead(200, { "Content-Type": "application/json" });
				resp.end(JSON.stringify({ k: k, fact: factorial(k) }));
			}
		} else resp.end(JSON.stringify({ k: 0 }));
	})
	.listen(5000, () => console.log("http://localhost:5000/"));
