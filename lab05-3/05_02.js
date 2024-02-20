const http = require("http");
const fs = require("fs");
const nodemailer = require("nodemailer");
const url = require("url");
const Emitter = require("events");
const emitter = new Emitter();

let senderEmail;
let senderPass;
let receiverEmail;
let message;

emitter.on("POST", (request, response) => {
    console.log("POST.MESSAGE");
    request.on("data", (data) => {
        let temp = JSON.parse(data);
        senderEmail = temp.sender;
        senderPass = temp.senderPass;
        receiverEmail = temp.receiver;
        message = temp.message;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            seccure: false,
            service: "gmail",
            auth: {
                user: senderEmail,
                pass: senderPass,
            },
        });

        let mailOptions = {
            from: senderEmail,
            to: receiverEmail,
            subject: "Sending email using Node.js",
            text: message,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        response.end(JSON.stringify(temp));
    });
});

http.createServer((request, response) => {
    let html = fs.readFileSync("index.html");
    if (url.parse(request.url).pathname === "/") {
        response.writeHead(200, { "Context-type": "text/html; charset=utf-8" });
        response.end(html);
    } else if (url.parse(request.url).pathname === "/send") {
        emitter.emit(request.method, request, response);
    }
}).listen(5000, console.log("Server is running"));
