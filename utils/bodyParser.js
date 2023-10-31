module.exports = (req) => {

    return new Promise((resolve, reject) => {

        let data = "";

        try {
            req.on("data", (chunk) => {
                data += chunk;
            })

            req.on("end", () => {
                resolve(data)
            })
        }

        catch (err) {
            console.log(err);
            reject(err)
        }
    })
};