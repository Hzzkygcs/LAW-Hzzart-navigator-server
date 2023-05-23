const express = require("express");
const route = express.Router();

route.get("/health", async (_req, res) => {
    res.status(200).send('OK');
});

module.exports.consulHealthRoute = route;