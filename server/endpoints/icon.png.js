const {readFileSync: read} = require('fs');
const png = read("./client/icon.png");
module.exports = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.write(png);
    res.end();
}