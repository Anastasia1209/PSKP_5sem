const http = require("http");
const fs = require("fs");

http
	.createServer(function (request, response) {
		switch (request.url) {
			case "/html":
				readHTML("index.html");
				break;

			case "/png":
				fs.readFile("photo.png", (err, image) => {
					response.end(image);
				});
				break;

			case "/xmlhttprequest":
				readHTML("xmlhttprequest.html");
				break;

			case "/api/name":
				response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
				response.end("Голодок Анастасия Юрьевна");
				break;
			case "/fetch":
				readHTML("fetch.html");
				break;
			case "/jquery":
				readHTML("jquery.html");
				break;
			default:
				break;
		}
		function readHTML(path) {
			fs.readFile(path, (err, data) => {
				if (err != null) {
					console.log("Обшибка");
					return;
				} else {
					response.writeHead(200, {
						"Content-Type": "text/html;charset=utf-8",
					});
					response.end(data);
				}
			});
		}
	})
	.listen(5000, console.log("Server is running at http://localhost:5000"));
