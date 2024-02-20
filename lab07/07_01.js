const http = require("http");

const options = {
    host: "127.0.0.1",
    path: "/1",
    port: 5000,
    method: "GET",
};

const request = http.request(options, (response) => {
    console.log("Request method: " + request.method);
    console.log(`Status code:     ${response.statusCode}`);
    console.log(`Status message:  ${response.statusMessage}`);
    console.log(`Server IP:       ${response.socket.remoteAddress}`);
    console.log(`Server port:     ${response.socket.remotePort}`);

    let data = "";
    response.on("data", (chunk) => {
        console.log(
            `Response body (data): ${(data += chunk.toString("utf8"))}`
        );
    });
    response.on("end", () => {
        console.log(`Response body (end):  ${data}\n\n`);
    });
});
request.on("error", (e) => {
    console.log(` ${e.message}\n\n`);
});
request.end();
