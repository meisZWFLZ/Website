module.exports = (req, res) => {
    json = JSON.stringify({id: 1});
    console.log(json);
    res.writeHead(200, {"Content-Type": "application/json"})
    res.write(json);
    console.log(res);
}