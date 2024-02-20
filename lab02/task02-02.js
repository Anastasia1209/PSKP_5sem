// const http = require('http');
// const fs = require('fs');

// http.createServer(function(request, response) {
//     const fileName = "photo.png";

//     if(request.url === "/png") {

//         response.setHeader("Content-Type", "image/png");

//         fs.readFile(fileName, (err, image) => {
//             response.end(image);
//         })
//     }

// }).listen(5000, console.log("Server is running at http://localhost:5000"));
