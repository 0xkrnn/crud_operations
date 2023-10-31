module.exports = (req, res, id) => {

    const baseurl = req.url.substring(0, req.url.lastIndexOf("/"))
    const urlParam = req.url.split("/")[3];
    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if (req.url === "/api/movies") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify(req.movies))
    } else if (baseurl === "/api/movies" && v4.test(urlParam)) {
        if (id.includes(urlParam)) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            let param = req.movies.findIndex((item) => {
                return item.id === urlParam
            });
            res.write(JSON.stringify(req.movies[param]))
        } else {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });
            res.write(JSON.stringify({
                "status": 404,
                "message": "There is no data for this uuid"
            }));
        }
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            "status": 404,
            "message": "uuid is not valid"
        }));
    }

    res.end()

}