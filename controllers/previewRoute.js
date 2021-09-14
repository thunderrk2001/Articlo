const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/userArticles")
var validation = require("../middlewares/validator")
router.get("/writeArticle/previewRoute", validation, (req, res) => {
    res.status(200).render("./previewArticleAfterWrite.ejs", { preview: "main_preview" })
})
router.get("/preview/:id", async(req, res) => {
    const json_obj = await model.findOne({ _id: req.params.id }).select({ article: 1, title: 1, userName: 1, dateTime: 1, _id: 0 }).lean()
    res.status(200).render("./previewArticle.ejs", { json_res: json_obj })
})
module.exports = router