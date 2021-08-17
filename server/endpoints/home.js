const { readFileSync: read, writeFileSync: write } = require('fs');
const html = read("./client/index.html");
const intformat = require('biguint-format');
const FlakeId = require("flake-idgen");

module.exports = async (req, res) => {
    userid = (req.headers.cookie || "");
    console.log(userid);
    userid = userid.split(/(?<!\\);\s/g);
    console.log(userid);
    userid = userid.find(e => /user=\d+/.test(e)) || "";
    console.log(userid);
    userid = userid.slice("user=".length);
    if (!userid) {
        userid = await intformat(new FlakeId({ epoch: 1629120000000, worker: 0, datacenter: 0 }).next(), 'dec');

        write(
            "./server/data/users/" + userid + ".json",
            JSON.stringify({ id: userid }),
            { flag: "wx" }
        );
    }
    console.log(userid);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(read("./server/data/users/" + userid + ".json"));
    res.end();
}