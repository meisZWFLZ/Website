const {readFileSync: read} = require('fs');
const js = read("./client/client.js");
module.exports = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/js' });
    res.write(js);
}