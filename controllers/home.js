const express = require('express')
const router = express.Router()
const model = require("../models/userArticles")
const validator = require("../middlewares/homePageValidator")
router.get("/", validator, async(req, res) => {
    const json_list = await model.find({}).limit(10)
    res.status(200).render("./homePage.ejs", { json_list: json_list, signedState: req.isLoggedIn, name: req.userName })
})
router.get("/page/:page", validator, async(req, res) => {
    const page = req.params.page
    if (page == "1" || isNaN(page))
        res.status(200).redirect("/")
    else if (parseInt(page, 10) <= 0) {
        res.status(200).redirect("/")
    } else {
        const len = await model.countDocuments()
        if ((page - 1) * 10 < len) {
            const json_list = await model.find({}).skip((page - 1) * 10).limit(10)
            res.status(200).render("./homePage.ejs", { json_list: json_list, signedState: req.isLoggedIn, name: req.userName })
        } else {
            res.status(200).redirect("/")
        }
    }
})

module.exports = router