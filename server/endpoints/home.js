const { readFileSync: read } = require('fs');
const html = read("./client/index.html");
module.exports = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
}