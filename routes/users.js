const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../schema/users");


Router.get("/", async (req, res) => {
    const result = await users.find({});
    res.send(result);
});

Router.get("/username/:username", async (req, res) => {
    const result = await users.find({'username': req.params.username})
    res.send(result);
})

Router.post("/", async (req, res) => {

    const { name, username, password } = req.body;
    if (!name || !username || !password) {
        res.status(400).send("Name, username or password is missing from body");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new users({
            name: name,
            username: username,
            password: hashedPassword
        })

        const result = await user.save()
        console.log(result)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send("Duplicated username!");
        }
        res.status(500).send("Uh oh, something went wrong!");
        console.log(error)
    }

})

Router.post("/reset", async (req, res) => {
    await users.deleteMany({})
})

module.exports = Router;