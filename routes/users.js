const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const userSchema = require("../schema/users");


Router.get("/", (req, res) => {
    res.send({ "status": "400", "message": "user api endpoint reached", "time": Date.now() });
});

Router.post("/", async (req, res) => {
    const data = req.body;
    var hashedPassword;

    if (data.name && data.password && data.username) {
        bcrypt.hash(data.password, 12, function (error, result) {
            hashedPassword = result;
            const user = new userSchema({
                name: data.username,
                username: data.username,
                password: hashedPassword
            })
            user.save().then((result) => {
                res.send(result);
            })
        })
    }

})

module.exports = Router;