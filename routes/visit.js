
const express = require("express");
const {json} = require("express");
const route = express.Router();

route.get("/visit/:env/:port", async (req, res) => {
    const key = req.path.env;
    if (!process.env[key]) {
        res.status(404);
        return res.send("Not found")
    }
    res.redirect(`http://${process.env[key]}:${req.path.port}`);
});


module.exports.visitRoute = route;