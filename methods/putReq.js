const bodyParser = require("../utils/bodyParser");
const writeFile = require("../utils/file-write")

module.exports = async (req, res, id) => {

    const urlParam = req.url.split("/")[3];

    if (id.includes(urlParam)) {

        const index = req.movies.findIndex((item) => {
            return item.id === urlParam
        })

        let bodyData = await bodyParser(req);
        let data = JSON.parse(bodyData)
        req.movies[index] = data;
        writeFile(req.movies)
        res.writeHead(201, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            "status": 201,
            "message": "Modified suceesfully"
        }))

    } else {
        res.writeHead(304, {
            "Content-Type": "application/json"
        });
        res.write("nor")
    }

    res.end();

};
