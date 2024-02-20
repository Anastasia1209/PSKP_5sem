const http = require('http');
const url = require('url');
const fs = require('fs');
const WebSocket = require('ws');

const { FORMAT, send } = require('./send-http-response');

const HTTP_PORT = 3000;
const WS_PORT = 4000;

const http_handler = (request, response) => {
    const path = url.parse(request.url, true);
    switch(path.pathname){
        case '/start':
            response.end(fs.readFileSync('./08-01.html'));
            break;
        default: 
            send(400,response,"Error: resource not found",FORMAT.HTML);
    }
};

const http_server = http.createServer(http_handler);
http_server.listen(HTTP_PORT, () => console.log(`Start server at http://localhost:${HTTP_PORT}`));

const ws_server = new WebSocket.Server({port: WS_PORT, host: 'localhost', path: '/wsserver'}, () => {console.log(`WebSocket-server started http://localhost:${WS_PORT}`)});
ws_server.on('connection', ws => {
    let countMessages = 0;
    let countMessagesFromClient;

    ws.on('message', message => {
        console.log(message.toString());
        const parts = message.toString().split(' ');
        
        if (parts[0] === '08-01-client:') {
            countMessagesFromClient = parts[1];
        } else {
            console.error('Invalid message format from the client:', message);
        }
    });
    
    setInterval(() => {
        if (countMessagesFromClient !== undefined) {
            ws.send(`08-01-server: ${countMessagesFromClient}->${countMessages++}`);
        } else {
            console.log('No message received from the client yet.');
        }
    }, 5000);
});

ws_server.on('error', error => { console.log('error connection: ', error.message); })