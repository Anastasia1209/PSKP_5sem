const WebSocket = require("ws");
const fs = require("fs");

const ws = new WebSocket("ws://localhost:4000/fileDownload");

const duplex = WebSocket.createWebSocketStream(ws, { encoding: "utf8" });

const fileName = `./file_new2a`;

let downloadedFile = fs.createWriteStream(fileName);
duplex.pipe(downloadedFile);
