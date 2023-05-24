require("express-async-errors");
const express = require("express");
const {route} = require("./routes/home");
const {visitRoute} = require("./routes/visit");
const {consulHealthRoute} = require("./routes/consul");
const {redirectToFrontendGcp} = require("./routes/gcp");
const {unregisterUnhealthyServiceRoute} = require("./routes/unregister-unhealthy-nodes");




module.exports.server = async function () {
    let app = express();
    app.use(express.json());

    app.use(route);
    app.use(visitRoute);
    app.use(consulHealthRoute);
    app.use(redirectToFrontendGcp);
    app.use(unregisterUnhealthyServiceRoute);


    let PORT = process.env.PORT;
    if (PORT == null){
        PORT = 5050;
    }
    return app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

