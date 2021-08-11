const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/dbSchema")
var validator = (async(req, res, next) => {
    var t = req.cookies.token
    if (t != undefined) {
        jwt.verify(t, process.env.bcryptHash, async(e, d) => {
            if (e) {
                res.cookie("nextPage", "writeArticle", {
                    httpOnly: false,
                    secure: false,
                })
                res.redirect("/signUp")
            } else {
                const user = await model.findOne({ "userDataId": d })
                req.userName = user.userName
                req.userDataId = d
                next()
            }
        })
    } else {
        res.cookie("nextPage", "writeArticle", {
            httpOnly: false,
            secure: false,
        })
        res.redirect("/signUp")

    }
})
module.exports = validator