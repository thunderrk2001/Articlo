const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/dbSchema")
router.get("/getAllUsers", async(req, res) => {
    try {
        var users = await model.find()
        if (users != null) {
            var finalUsers = { "users": [] }
            users.forEach((user) => {
                let cp = JSON.parse(JSON.stringify(user))
                delete cp.password
                finalUsers["users"].push(cp)
            })
            res.json(finalUsers)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router