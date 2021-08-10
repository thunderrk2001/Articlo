const express = require("express")
const router = express.Router()
var emailCheck = require('email-check');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/dbSchema")

router.post("/signUp", async(req, res) => {
    try {
        const userName = req.body.userName
        const password = req.body.password
        emailCheck(req.body.userName)
            .then(function(value) {
                if (!value) {
                    res.status(400).send({ "message": "email with given user name Do Not exist" })
                }

            })
            .catch(function(err) {
                res.status(400).send({ "message": "email with given user name Do Not exist" })
            });
        const findModel = await model.findOne({ userName: userName })
        if (findModel == null) {
            await bcrypt.hash(password, 10, async(e, hash) => {
                try {
                    if (e)
                        throw e
                    var userDataId = userName + hash
                    await bcrypt.hash(userName + process.env.secret_key, 10, async(e, res_hash) => {
                        userDataId = res_hash
                        const jsonObject = { userName: userName, password: hash, userDataId: userDataId }
                        const collection = await model(jsonObject).save()
                        var token = jwt.sign(userDataId, process.env.bcryptHash);
                        res.status(200).cookie("token", token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "strict"
                        })
                        res.send({
                            "message ": "success"
                        })
                        console.log(token)
                    })

                } catch (err) {
                    res.status(400).send({ "message": "error" });

                }
            })
        } else {
            res.status(400).send({ "message": "Invalid credential " })
        }
    } catch (e) {
        res.status(400).send({ "message": e })
        console.log(e);
    }
})
module.exports = router