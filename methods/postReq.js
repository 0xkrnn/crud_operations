const bodyParser = require("../utils/bodyParser");
const { v4: uuid } = require("uuid");
const writeFile = require("../utils/file-write")

module.exports = async (req, res) => {

    if (req.url === "/api/movies") {
        let bodyData = await bodyParser(req);
        let data = JSON.parse(bodyData)
        data.id = uuid();

        req.movies.push(data);
        writeFile(req.movies)
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            "status": 200,
            "message": "content updated"
        }))
    } else {
        res.writeHead(400, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            "status": 400,
            "message": "cannot be added"
        }))
    }
    res.end()
};