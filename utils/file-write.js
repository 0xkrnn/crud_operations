const fs = require("node:fs");
const path = require("node:path");

module.exports = (data) => {
    try {
        fs.writeFileSync(path.join(__dirname, "..", "data", "data.json"), JSON.stringify(data))
    } catch (err) {
        console.log(err);
    }
};