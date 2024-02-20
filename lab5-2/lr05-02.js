var http = require('http');
var fs = require('fs');
var url = require('url');
const { parse } = require('qs');
// const sendMail = require('./m05_GPA.js');
// const npmmodule = require('m05_gpa'); //4-15 
const npmmodule = require('C:\\Users\\user\\AppData\\Roaming\\npm\\node_modules\\m05_gpa');//4-17



let http_handler = (req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (url.parse(req.url).pathname == '/' && req.method == 'GET') {
        resp.end(fs.readFileSync('./lr05-02.html'));
    } else if (url.parse(req.url).pathname == '/' && req.method == 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); })
        req.on('end', () => {
            let parm = parse(body);
            // sendMail(parm.reciever, parm.message);
            npmmodule(parm.reciever, parm.message);//4-16
            resp.end(`<h1>ОК: ${parm.reciever},${parm.sender},${parm.message}</h1>`);
        });
    } else resp.end('<h1>Error</h1>');
}

let server = http.createServer(http_handler);
server.listen(5000);
console.log('Server running at http://localhost:5000/');