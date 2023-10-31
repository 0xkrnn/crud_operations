const http = require("node:http");
require("dotenv").config();
const fs = require("fs");
const path = require("path");


const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 8800;


// methods

const getReq = require("./methods/getReq");
const postReq = require("./methods/postReq");
const putReq = require("./methods/putReq");
const deleteReq = require("./methods/deleteReq");

// Data

const data = require("./data/data.json");

// Server

const server = http.createServer((req, res) => {

    req.movies = data;
    let id = []
    req.movies.map((item) => {
        id.push(item.id)
    })


    switch (req.method) {
        case "GET":
            getReq(req, res, id);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res, id);
            break;
        case "DELETE":
            deleteReq(req, res, id);
            break;
        default:
            res.writeHead(405, {
                "Content-Type": "application/json"
            });
            res.write(JSON.stringify({
                "status": 405,
                "message": "Method Not allowed"
            }));
            res.end();
    };

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});