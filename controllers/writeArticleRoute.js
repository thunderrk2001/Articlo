const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const images_model = require("../models/image")
const validator = require("../middlewares/createArticleMiddleware")
const model = require("../models/image")
router.get("/writeArticle", validator, async(req, res) => {
    res.cookie("nextPage", "", {
        httpOnly: false,
        secure: false,
    })
    res.status(200).render("./writeArticle.ejs", { name: req.userName })

})
router.get("/writeArticle/userUploadedImages", validator, async(req, res) => {
    let json_list = []
    let urlList = []

    json_list = await model.find({ "userDataId": req.userDataId })
    if (json_list.length != 0) {
        json_list.forEach((json_ele) => {
            urlList.push(json_ele.image_url)
        })
        res.status(200).send({ "message": "success", "urlList": urlList })
    } else {
        res.send({ "message": "Nothing in user`s databse" })
    }

})
module.exports = router