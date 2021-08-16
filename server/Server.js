const http = require("http");

class MyServer extends http.Server {
    constructor(port) {
        super(MyServer.reqListener);
        this.port = port;
        super.listen(port, () => {
            console.log("http://localhost:" + port);
        });
    }

    static reqListener(req, res) {
        console.log(req);
        const endpoint = require(`./endpoints/${req.url.slice(1)}.js`)//.bind(this)(req, res);
        endpoint(req, res);
        res.end();
    }
}
module.exports = MyServer;