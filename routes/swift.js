const express = require('express');
const Router = express.Router();

const sampleData = {
    "status": "reachable", 
    "message": "hola"
}

Router.get("/", (req, res) => {
    res.send(sampleData)
})

module.exports = Router