
const express = require("express");
const {json} = require("express");
const route = express.Router();

route.get("/", async (req, res) => {
    res.setHeader('content-type', 'application/json');

    res.send(JSON.stringify(
        env_to_dict()
    ));
});


function env_to_dict() {
    const ret = {};
    const environments = all_env_that_starts_with_hzzart();
    for (const environment of environments){
        ret[environment] = process.env[environment];  // duplicate, two version.
    }

    for (const environment of environments){
        const splitteds = environment.split("_");

        let current_dict = ret;
        for (const splitted of splitteds) {
            if (splitted.toLowerCase() === "hzzart")
                continue;
            if (!(splitted in current_dict)){
                current_dict[splitted] = {};
            }
            current_dict = current_dict[splitted];
        }

        current_dict.value = process.env[environment];
    }
    return ret;
}


function all_env_that_starts_with_hzzart() {
    const ret = [];
    const variables = Object.keys(process.env);
    for (const env_var of variables){
        if (env_var.toLowerCase().startsWith("hzzart"))
            ret.push(env_var);
    }
    return ret;
}



module.exports.route = route;