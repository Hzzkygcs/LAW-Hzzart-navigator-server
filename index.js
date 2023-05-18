require('dotenv').config();
const {server} = require("./main");

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});
process.on('unhandledRejection', (err) => {
    console.error('Uncaught promise exception:', err);
});


server(false)