const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use((req, res, next) => {
    console.log(`IP: ${req.ip} | TIME: ${new Date().toISOString().split("T")[0]} ${new Date().toISOString().split("T")[1].split(".")[0]} | REQ. TYPE: ${req.method} | REQ. URL: ${req.originalUrl}`);
    next();
})

const config = require("./config.json");
const DBOn = false;

(async() => {
    if (DBOn) {
        try {
            await mongoose.connect(config.local.mongoDB.link);
            console.log("Successfully logged into MongoDB database!");
        } catch (error) {
            console.log("Failed attempt to connect to MongoDB database!");
        }
    }
})();


// routes (import)
const users = require("./routes/users");
const files = require("./routes/src");


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/landing.html"));
})

app.get("/:page", (req, res) => {
    const webpages = config.webpages;
    for (var i = 0; i < webpages.length; i++) {
        if (webpages[i] == req.params.page) {
            res.sendFile(path.join(__dirname, `/public/html/${req.params.page}.html`));
            return res.status(200);
        }
    }

    res.sendFile(path.join(__dirname, "/public/html/404.html"));
})


app.use("/api/src", files);

app.use(express.json()); // uses body from this point onwards

// routes (enabler)
app.use("/api/users", users)

app.listen(config.server.port, () => {
    console.log(`Server is ready at: http://localhost:${config.server.port}/`)
});

process.on('SIGINT', async () => {
    console.log("Terminating server...");
    if (DBOn) {
        await mongoose.connection.close();
    }
    process.exit(0);
});