const MyServer = require("./server/Server.js");
new MyServer(3001);




const http = require('http');
// // const { readFileSync: read } = require('fs');

// // const API = require("./server/API");
// // const port = 3000;

// // const html = read("./client/index.html");
// // const js = read("./client/client.js");
// // const icon = read("./client/icon.png");

const server = http.createServer((req, res) => {
    console.log(req);
    server.myEmit(req, res);
    res.end();
    res.statusCode;
    res.setHeader("Location", "/home");
    req.headers.host;
    // res.setHeader("Set-Cookie", fetch("http://localhost:" + port + "/api/users/new_user"))
});

// server.myEmit = function (req, res) {
//     url = req.url.slice(1).split(/\//g);
//     this.emit(url[0], req, res, url.slice(1));
// }

// // server.api = new API();

// //basic url
// server.addListener("", (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write(html);
// })

// //the js stuff ig maybe
// server.addListener("client.js", (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/js' });
//     res.write(js);
// })

// //icon
// server.addListener("favicon.ico", (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'image/png' });
//     res.write(icon);
// })

// function listener(e) {
//     if (e) return console.log("Something went wrong", error);
//     console.log(`Server is listening on port ${port}!\nhttp://localhost:${port}`)
// }

// server.listen(port, listener);