const express = require("express")
const model = require("../models/dbSchema")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
var validator = (async(req, res, next) => {
    var t = req.cookies.token
    if (t != undefined) {
        await jwt.verify(t, process.env.bcryptHash, async(e, d) => {
            if (e) {
                req.status(200).cookie("nextPage", "/writeArticle", {

                })
                res.redirect("/signUp")
            } else {
                const user = await model.findOne({ "userDataId": d })
                req.userDataId = d
                req.userName = user.userName
                next()
            }
        })
    } else {
        res.redirect("/signUp")

    }
})
module.exports = validator