
const express = require("express");
const {getConsulSingleton, getAnyHealthyServiceHostName, getAllHealthyServiceUrl} = require("../config/consul");
const url = require("url");
const route = express.Router();

const NO_INSTANCE_RUNNING_GCP = "I'm sorry, currently no services are running. " +
    "Please contact immanuel01@ui.ac.id to activate the GCP instances";

route.get("/unregister", async (_req, res) => {
    try{
        const consul = await getConsulSingleton(80, 'navigator-heroku');  // initialize
        const result = await unregisterUnhealthyNodes(consul);
        res.status(200).send(result);
    }catch (e) {
        console.log("EXCEPTION ", e)
        res.header('x-err', 'Cannot reach Consul GCP instance')
            .status(404).send(NO_INSTANCE_RUNNING_GCP);
    }
});

module.exports.unregisterUnhealthyServiceRoute = route;




async function unregisterUnhealthyNodes(consul) {
    try {
        const messages = [];

        // Get all services
        // const services = await getAllServices(consul);
        const unhealthyServices = await consul.health.state("critical");

        // Iterate over each service
        for (const {ServiceID} of unhealthyServices) {
            await consul.agent.service.deregister(ServiceID);
            const msg = `Unregistered unhealthy: ${ServiceID}`;
            messages.push(msg);
            console.log(msg);
        }

        messages.push('All unhealthy nodes unregistered.');
        return messages.join('\n<br>\n');
    } catch (error) {
        console.error('Error unregistering unhealthy nodes:', error);
        return 'Error unregistering unhealthy nodes:';
    }
}


async function getAllServices(consul) {
    const ret = [];
    const serviceInstances = await consul.agent.service.list();
    for (const serviceInstanceId of Object.keys(serviceInstances)) {
        const serviceInstance = serviceInstances[serviceInstanceId];
        const {Service} = serviceInstance;
        ret.push(Service);
    }
    return ret.filter(function(elem, pos) {
        return ret.indexOf(elem) === pos;
    });
}