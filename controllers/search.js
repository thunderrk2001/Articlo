const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("../models/userArticles")
const validator = require("../middlewares/createArticleMiddleware")
router.post("/search", async(req, res) => {
    const title = req.body.title
    const json_list = await model.find({ $text: { $search: title } }).limit(10)
    let list = []
    json_list.forEach(element => {
        list.push({ "id": element._id, "title": element.title })

    });

    res.status(200).send(list)
})
module.exports = router