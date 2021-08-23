const http = require("http");
const { readFileSync: read, readdirSync: rDir } = require('fs');
const markers = require("./markers.json");

//get directory
getDir = (dirPath) => {
    let dir = [];
    try {
        rDir(dirPath).forEach(e => dir = dir.concat(getDir(`${dirPath}/${e}`)));
    } catch (e) {
        return [dirPath];
    }
    return dir;
}
const clientDir = getDir("./client").map(e => e.slice("./client".length)).filter(e => !markers.blacklist.includes(e));
console.log(clientDir);

const endpoints = Object.fromEntries(getDir("./server/endpoints").map(e => e.slice("./server/".length)).map(e => [e.slice("endpoints".length), require(`./${e}`)]));
console.log(endpoints);

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

        let path = req.url.split("?")[0];
        let item = "";
        try {
            if (item = Object.entries(endpoints).find(e => e[0] == path + ".js")) {
                return item[1](req, res);
            } else if (MyServer.sendSource(path, res)) return;
        } catch (e) {
            console.log(e);
        }
        console.log("hi");
        res.statusCode = 404;
        MyServer.sendSource("/404", res);
    }

    static sendSource(path, res) {
        let item = "";
        if (item = clientDir.find(e => e == path || e.split(".")[0] == path)) {
            MyServer.write(res, item, read("./client" + item))
            res.end();
            return true;
        }
        return false;
    }
    static write(res, name, data) {
        let ext = name.split(".")[1] || "txt";
        let type = "";
        switch (ext) {
            case "json":
                type = "application/json";
                break;
            case "gif":
            case "jpeg":
            case "tiff":
            case "png":
                type = "image/" + ext;
                break;
            case "css":
            case "csv":
            case "html":
            case "js":
            case "javascript":
            case "xml":
                type = "text/" + ext;
                break;
            case "mpeg":
            case "mp4":
            case "webm":
                type = "video/" + ext;
                break;
        }
        res.writeHead(200, { 'Content-Type': type });
        res.write(data);
    }
}
module.exports = MyServer;

// function debug(x) {
//     console.log(x)
//     return x;
// }