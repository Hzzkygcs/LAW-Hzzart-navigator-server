require("express-async-errors");
const express = require("express");
const {route} = require("./routes/home");
const {visitRoute} = require("./routes/visit");




module.exports.server = async function () {
    let app = express();
    app.use(express.json());

    app.use(route);
    app.use(visitRoute);


    let PORT = process.env.PORT;
    if (PORT == null){
        PORT = 5050;
    }
    return app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

