const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

const config = require("./config.json");

(async() => {
    try {
        await mongoose.connect(config.local.mongoDB.link);
        console.log("Successfully logged into MongoDB database!");
    } catch (error) {
        console.log("Failed attempt to connect to MongoDB database!");
    }
})();


const apiJSON = require("./api.json");


// routes (import)
const users = require("./routes/users");


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/landing.html"));
})

app.use(express.json()); // uses body from this point onwards

// routes (enabler)
app.use("/api/users", users)

app.listen(config.server.port, () => {
    console.log(`Server is ready at: http://localhost:${config.server.port}/`)
});

process.on('SIGINT', async () => {
    console.log("Terminating server...");
    await mongoose.connection.close();
    process.exit(0);
});