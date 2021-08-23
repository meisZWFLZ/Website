const { readFileSync: read, writeFileSync: write } = require('fs');
const html = read("./client/home.html");
const intformat = require('biguint-format');
const FlakeId = require("flake-idgen");

module.exports = async (req, res) => {
    userid = ((req.headers.cookie || "").split(/(?<!\\);\s/g).find(e => /user=\d+/.test(e)) || "").slice("user=".length);
    if (!userid) {
        userid = await intformat(new FlakeId({ epoch: 1629120000000, worker: 0, datacenter: 0 }).next(), 'dec');

        write(
            "./server/data/users/" + userid + ".json",
            JSON.stringify({ id: userid }),
            { flag: "wx" }
        );
    }
    console.log(userid);

    res.setHeader("Set-Cookie", `user=${userid}; Expires=Tue, 16 Aug 3021 00:00:00 GM;`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
}