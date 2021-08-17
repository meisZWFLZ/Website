const {readFileSync: read} = require('fs');
const icon = read("./client/icon.png");
module.exports = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.write(icon);
    res.end();
}