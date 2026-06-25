const cors = require("cors");
const express = require("express");
const config = require("../config.json");
const path = require("path");
const DB = require("./mongoDB");

function server() {
    const app = express();
    app.use(cors());
    app.use((req, res, next) => {
        console.log(`IP: ${req.ip} | TIME: ${new Date().toISOString().split("T")[0]} ${new Date().toISOString().split("T")[1].split(".")[0]} | REQ. TYPE: ${req.method} | REQ. URL: ${req.originalUrl}`);
        next();
    });

    // routes
    const users = require("../routes/users");
    const files = require("../routes/src");
    const swift = require("../routes/swift");

    app.use(express.static("public"));

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/landing.html"));
    })
    
    app.get("/:page", (req, res) => {
        const webpages = config.webpages;
        for (var i = 0; i < webpages.length; i++) {
            if (webpages[i] == req.params.page) {
                res.sendFile(path.join(__dirname, `../public/html/${req.params.page}.html`));
                return res.status(200);
            }
        }
    
        res.sendFile(path.join(__dirname, "../public/html/404.html"));
    })
    

    app.use("/api/src", files);
    
    app.use(express.json());
    
    // routes (api, json enabled)
    if (DB.active) {
        app.use("/api/users", users);
        app.use("/api/swift_development", swift);
    }
    
    

    app.listen(config.server.port, () => {
        console.log(`Server is ready at: http://localhost:${config.server.port}/`)
    });
}

module.exports = {server}