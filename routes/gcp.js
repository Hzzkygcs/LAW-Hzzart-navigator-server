const express = require("express");
const {getConsulSingleton, getAnyHealthyServiceHostName, getAllHealthyServiceUrl} = require("../config/consul");
const url = require("url");
const route = express.Router();

const NO_INSTANCE_RUNNING_GCP = "I'm sorry, currently no services are running. " +
    "Please contact immanuel01@ui.ac.id to activate the GCP instances";

route.get("/gcp", async (_req, res) => {
    try{
        console.log("Inside try catch. Getting consul singleton");
        await getConsulSingleton(80, 'navigator-heroku');  // initialize
        console.log("Fetching all healthy service url");
        const services = await getAllHealthyServiceUrl('frontend-service');
        if (services == null || services.length === 0)
            return res.header('x-err', 'Consul is active but no frontend services are running')
                .status(404).send(NO_INSTANCE_RUNNING_GCP);
        let service = url.parse(services[0]).hostname;
        service = `http://${service}`;
        console.log(service)
        return res.redirect(service);
    }catch (e) {
        console.log("EXCEPTION ", e)
        res.header('x-err', 'Cannot reach Consul GCP instance')
            .status(404).send(NO_INSTANCE_RUNNING_GCP);
    }
});

module.exports.redirectToFrontendGcp = route;