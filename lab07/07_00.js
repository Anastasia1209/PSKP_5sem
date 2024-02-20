let http = require("http");
let url = require("url");
const xmlBuilder = require("xmlbuilder");
const parseString = require("xml2js").parseString;
let multiparty = require("multiparty");
let fs = require("fs");

let http_handler = (req, resp) => {
    let pathname = url.parse(req.url, true).pathname;

    if (req.method == "GET") {
        switch (pathname) {
            case "/1":
                resp.writeHead(200, { "Content-Type": "text/plain" });
                resp.end("server 07-01");
                break;
            case "/2":
                let query = url.parse(req.url, true).query;
                let params = "";
                resp.writeHead(200, { "Content-Type": "text/plain" });
                resp.write("GET-params\n");
                for (key in query) {
                    params += `${key} = ${query[key]}\n`;
                }
                resp.end(`${params}`);
                break;
            default:
                break;
        }
    } else if (req.method == "POST") {
        switch (pathname) {
            case "/3":
                query = url.parse(req.url, true).query;
                params = "";
                resp.write("POST-params\n");
                for (key in query) {
                    params += `${key} = ${query[key]}\n`;
                }
                resp.end(`${params}`);
                break;
            case "/4":
                let result = "";
                req.on("data", (data) => (result += data));
                req.on("end", () => {
                    let data = JSON.parse(result);
                    let obj = {};
                    obj["__comment"] = "Response. Lab09";
                    obj["x_plus_y"] = +data.x + +data.y;
                    obj[
                        "Concatanition_s_o"
                    ] = `${data.s}: ${data.o.surname}, ${data.o.name}`;
                    obj["Length_m"] = data.m.length;
                    resp.writeHead(200, { "Content-Type": "application/json" });
                    resp.end(JSON.stringify(obj));
                });
                break;
            case "/5":
                let string = "";
                req.on("data", (data) => (string += data.toString()));
                req.on("end", () => {
                    parseString(string, (err, result) => {
                        let sum = 0;
                        let mess = "";
                        result.request.x.forEach((element) => {
                            sum += Number.parseInt(element.$.value);
                        });
                        result.request.m.forEach((element) => {
                            mess += element.$.value;
                        });
                        let doc = xmlBuilder
                            .create("response")
                            .att("id", Math.round(Math.random() * 0o0))
                            .att("request", result.request.$.id);
                        doc.ele("sum", { element: "x", sum: `${sum}` });
                        doc.ele("concat", { element: "m", result: `${mess}` });
                        resp.writeHead(200, { "Content-Type": "text/xml" });
                        resp.end(doc.toString({ pretty: true }));
                    });
                });
                break;
            case "/6" && "/7":
                let form = new multiparty.Form({ uploadDir: "./static" });
                form.on("file", (name, file) => {
                    console.log(
                        `${name}=${file.originalFilename}: ${file.path}`
                    );
                });
                form.on("error", (err) => {
                    resp.writeHead(200, {
                        "Content-type": "text/plain;charset=utf8;",
                    });
                    resp.end("Error");
                });
                form.on("close", () => {
                    resp.writeHead(200, {
                        "Content-type": "text/plain;charset=utf8;",
                    });
                    resp.end("Success");
                });
                form.parse(req);
                break;
            default:
                break;
        }
    } else {
        console.log(`base`);
        try {
            resp.end("base page");
            console.log("success");
        } catch (err) {
            resp.writeHead(404, "Resource not found", {
                "Content-Type": "text/html",
            });
            resp.end("<h1>Error 404: Resource not found</h1>");
            console.log(err);
        }
    }
};

let server = http.createServer(http_handler);
server.listen(5000, console.log("Server is running")).on("error", (er) => {
    console.log("Error: " + er.message);
});
