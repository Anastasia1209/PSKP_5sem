const WebSocket = require("ws");

let countMessages = 0;
let socket = new WebSocket('ws:localhost:4000/wsserver');

socket.onopen = () => console.log('WS open by client');
const handler = setInterval(() => {
    socket.send(`08-01-client: ${countMessages++}`);
}, 3000);

socket.onclose = event => console.log(event.code, event.reason);

socket.onmessage = message => console.log('socket.onmessage - ', message.data);

socket.onerror = function (error) { alert('socket.onerror - ', error.message); }

setTimeout(() => {
    clearInterval(handler);
    socket.close(1000, 'WS closed by client');
}, 25000)