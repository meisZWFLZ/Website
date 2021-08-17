const home = require("./home.js");
module.exports = (req, res) => {
    res.statusCode = 301
    res.setHeader("Location", "/home");
    res.end();
};