const express = require("express");

const app = express();

const config = require("./config.json");

app.use(express.json());

app.get("/", (req, res) => {
    res.send({"status": "online"});
});

app.listen(config.server.port, () => {
    console.log(`Server is ready at: https://localhost:${config.server.port}/`)
});

// process.on('SIGINT', async() => {
//     // TODO: Log out of accounts
//     process.exit(0);
// })