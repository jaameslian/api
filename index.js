const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// app.use(cors());
// app.use((req, res, next) => {
//     console.log(`IP: ${req.ip} | TIME: ${new Date().toISOString().split("T")[0]} ${new Date().toISOString().split("T")[1].split(".")[0]} | REQ. TYPE: ${req.method} | REQ. URL: ${req.originalUrl}`);
//     next();
// })

const config = require("./config.json");

const DB = require("./core/mongoDB");
DB.DBConnect();

const ES = require("./core/express");
ES.server();

process.on('SIGINT', async () => {
    console.log("Terminating server...");
    if (DB.active) {
        await mongoose.connection.close();
        console.log("Mongoose connection successfully terminated.");
    }
    process.exit(0);
});