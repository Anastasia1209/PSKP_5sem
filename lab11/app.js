const http = require("http");

const getHandler = require("./getHandler");
const postHandler = require("./postHandler");
const putHandler = require("./putHandler");
const deleteHandler = require("./deleteHandler");

const Database = require("./database");
const DataBaseHandler = new Database();

http
	.createServer(async (req, res) => {
		switch (req.method) {
			case "GET":
				await getHandler(req, res, DataBaseHandler);
				break;
			case "POST":
				await postHandler(req, res, DataBaseHandler);
				break;
			case "PUT":
				await putHandler(req, res, DataBaseHandler);
				break;
			case "DELETE":
				await deleteHandler(req, res, DataBaseHandler);
				break;
		}
	})
	.listen(3000);
