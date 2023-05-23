
const express = require("express");
const {json} = require("express");
const route = express.Router();

route.get("/visit/:env/:port", async (req, res) => {
    const envKey = req.params.env;
    const port = req.params.port;
    console.log(`visited ${envKey}:${port}`)
    const key = envKey;
    if (!process.env[key]) {
        res.status(404);
        return res.send("Not found")
    }
    res.redirect(`http://${process.env[key]}:${port}`);
});


module.exports.visitRoute = route;