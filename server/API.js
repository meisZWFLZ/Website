const EventEmitter = require("events");
class API extends EventEmitter {
    API(server) {
        server.addListener(api, this.serverListener)
    };
    serverListener() {

    }
} 
module.exports = API;