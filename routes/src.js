const express = require("express");
const Router = express.Router();
const path = require("path");

Router.get("/script/:id", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../public/script/${req.params.id}`));
    } catch (error) {
        return res.status(400).send("Unable to access resource");
    }
})

Router.get("/css/:id", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../public/css/${req.params.id}`));
    } catch (error) {
        return res.status(400).send("unable to access resource");
    }
})

Router.get("/icons/:id", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, `../public/icons/${req.params.id}`));
    } catch (error) {
        return res.status(400).send("Unable to access resource");
    }
})

module.exports = Router;