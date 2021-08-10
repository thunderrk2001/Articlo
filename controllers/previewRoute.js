const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/dbSchema")
var validation = require("../middlewares/validator")
router.get("/writeArticle/previewRoute", validation, (req, res) => {
    res.status(200).render("./previewArticle.ejs")
})
module.exports = router