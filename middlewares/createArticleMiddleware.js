const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
var validator = ((req, res, next) => {
    var t = req.cookies.token
    if (t != undefined) {
        jwt.verify(t, process.env.bcryptHash, (e, d) => {
            if (e) {
                res.cookie("nextPage", "writeArticle", {
                    httpOnly: false,
                    secure: false,
                })
                res.redirect("/signUp")
            } else {
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