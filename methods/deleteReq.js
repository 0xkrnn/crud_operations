const bodyParser = require("../utils/bodyParser");
const writeFile = require("../utils/file-write")

module.exports = async (req, res, id) => {

    const urlParam = req.url.split("/")[3];

    if (id.includes(urlParam)) {

        const index = req.movies.findIndex((item) => {
            return item.id === urlParam
        })

        req.movies.splice(index, 1);
        writeFile(req.movies)
        res.writeHead(202, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            "status": 202,
            "message": "Req accepted"
        }));
    } else {
        res.writeHead(400, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            "status": 400,
            "message": "Bad request"
        }));
    }

    res.end();

};
