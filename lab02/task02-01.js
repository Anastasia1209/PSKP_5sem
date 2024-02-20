// const http = require('http');
// const fs = require('fs');

// http.createServer(function(request, response) {

//     const fileName = "index.html";
//     if(request.url === "/html") {
//         fs.access(fileName, fs.constants.R_OK, err => {
//             if(err) {
//                 response.statusCode = 404;
//                 response.end("Файл не найден");
//             } else {
//                 fs.createReadStream(fileName).pipe(response);
//             }
//         })
//     }
// }).listen(5000, console.log("Server is running at http://localhost:5000"));
