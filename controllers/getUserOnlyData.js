const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/dbSchema")
router.get("/getUser", async(req, res) => {
    var t = req.cookies.token
    console.log(t)
    res.send("ok")

})
module.exports = router