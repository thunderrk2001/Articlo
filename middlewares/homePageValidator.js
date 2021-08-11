const express = require("express")
const model = require("../models/dbSchema")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
var validator = (async(req, res, next) => {
    req.userName = null
    req.isLoggedIn = false
    var t = req.cookies.token
    if (t != undefined && t != "" && t != null) {
        await jwt.verify(t, process.env.bcryptHash, async(e, d) => {
            if (e) {


            } else {
                const user = await model.findOne({ "userDataId": d })
                req.userName = user.userName
                req.isLoggedIn = true
            }
        })
    } else {


    }
    next()
})
module.exports = validator