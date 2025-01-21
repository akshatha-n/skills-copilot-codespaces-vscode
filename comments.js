// create web server

// 1. require module
var http = require('http');
var fs = require('fs');

// 2. create server
http.createServer(function (req, res) {
    // 3. read file
    fs.readFile('comment.html', function (err, data) {
        // 4. write response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(8080); // 5. listen port

console.log("Server running at http://8000");