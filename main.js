require("express-async-errors");
const express = require("express");
const {route} = require("./routes/home");




module.exports.server = async function () {
    let app = express();
    app.use(express.json());

    app.use(route);


    let PORT = process.env.PORT;
    if (PORT == null){
        PORT = 5050;
    }
    return app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

let testMongo = null;

async function connectToMongodb(test){
    let mongooseUrl = process.env.DATABASE_HOST_URL;
    if (test && testMongo==null){
        const {MongoMemoryServer} = require("mongodb-memory-server");
        testMongo = await MongoMemoryServer.create();
    }
    if (test){
        mongooseUrl = testMongo.getUri();
    }
    if (mongooseUrl == null){throw new Error("DATABASE_HOST_URL IS NOT SET");}

    try{
        await mongoose.connect(mongooseUrl);
        mongooseUrl = removeCredentialFromMongodbUrl(mongooseUrl);
        console.log(`Connected to mongodb ${mongooseUrl}`)
        module.exports.connection = mongooseUrl;
    }catch (e){
        console.log("FAILED TO CONNECT TO MONGODB");
        throw e;
    }
}

function removeCredentialFromMongodbUrl(mongooseUrl) {
    return mongooseUrl.replace(/\/[a-zA-Z0-9-]+:[a-zA-Z0-9-]+@/, "/USERNAME:PASSWORD@")
}