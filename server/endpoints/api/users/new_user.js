const fs = require("fs");
const intformat = require('biguint-format');
const FlakeId = require("flake-idgen");

module.exports = async (req, res) => {
    userid = new FlakeId({epoch: 1629120000000, worker: 0, datacenter: 0});
    userid = await intformat(userid.next(), 'dec');
    console.log(userid);

    fs.writeFileSync(
        "./server/data/users/" + userid + ".json",
        JSON.stringify({ id: userid }),
        { flag: "wx" }
    );

    json = JSON.stringify(JSON.parse(fs.readFileSync("./server/data/users/" + userid + ".json")));
    console.log(json);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(json);
    console.log(res);

    res.end();
}