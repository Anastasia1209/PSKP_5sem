var http = require("http");
var util = require("util");
var url = require("url");
var fs = require("fs");
var ee = require("events");
var data = require("./db");

var db = new data.DB();

db.on("GET", (request, response) => {
	console.log("DB_GET");
	db.select().then((data) => response.end(JSON.stringify(data)));
});
db.on("POST", (request, response) => {
	console.log("DB_POST");
	request.on("data", (data) => {
		db.insert(JSON.parse(data))
			.then((user) => {
				return response.end(JSON.stringify(user));
			})
			.catch((errorMessage) => {
				return response.end(errorMessage);
			});
	});
});
db.on("PUT", (request, response) => {
	console.log("DB_PUT");
	request.on("data", (data) => {
		db.update(JSON.parse(data))
			.then((user) => {
				return response.end(JSON.stringify(user));
			})
			.catch((errorMessage) => {
				return response.end(errorMessage);
			});
	});
});
db.on("DELETE", (request, response) => {
	let id = +url.parse(request.url, true).query.id;
	if (id !== "" && Number.isInteger(id)) {
		db.delete(id)
			.then((user) => {
				return response.end("Deleted");
			})
			.catch((errorMessage) => {
				return response.end("User not found");
			});
	} else Promise.reject("Error");
});

http
	.createServer((request, response) => {
		const pathname = url.parse(request.url).pathname;

		switch (pathname) {
			case "/api/db":
				db.emit(request.method, request, response);
				break;
			case "/":
				fs.readFile("./index.html", (error, data) => {
					if (error) {
						console.log(error.message);
						return;
					}
					response.end(data);
				});
				break;
			default:
				response.statusCode = 404;
				break;
		}
	})
	.listen(5000, () =>
		console.log("Server is running at http://localhost:5000")
	);
