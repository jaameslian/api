const mongoose = require("mongoose");
const config = require("../config.json")

const active = false;

async function DBConnect() {

    if (active) {
        try {
            await mongoose.connect(config.local.mongoDB.link);
            console.log("Successfully logged into MongoDB database!");
        } catch (error) {
            console.log("MongoDB Error | Unable to connect to DB");
        }
    }

}

module.exports = {DBConnect, active};