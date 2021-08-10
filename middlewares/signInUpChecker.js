const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
var validator = ((req, res, next) => {
    var t = req.cookies.token
    if (t != undefined) {
        jwt.verify(t, process.env.bcryptHash, (e, d) => {

            if (e) {
                next()
            } else {
                res.redirect("/")
            }
        })
    } else {
        next()

    }
})
module.exports = validator