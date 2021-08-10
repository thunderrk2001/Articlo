const express = require("express")
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5500
const cors = require("cors")
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const model = require("./models/dbSchema")
const article_model = require("./models/userArticles")
const writeArticleRoute = require("./controllers/writeArticleRoute")
const signIn = require("./controllers/signInRoute")
const signUp = require("./controllers/signUpRoute")
const just = require("./controllers/justPost")
const getAlldata = require("./controllers/getAllData")
const userRoute = require("./controllers/getUserOnlyData")
const previewRoute = require("./controllers/previewRoute")
const upload_image_route = require("./controllers/uploadImage")
const image_rt = require("./controllers/image_cnt")
const home_route = require("./controllers/home")
const path = require("path");
app.set('view engine', 'ejs');
app.use('/static', express.static('static'))
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public/javascript/")));
app.use(express.static(path.join(__dirname, "public/")));
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: "50000"
}));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain)
app.use(cors())
app.use(home_route)
app.use(image_rt)
app.use(signIn)
app.use(signUp)
app.use(getAlldata)
app.use(just)
app.use(userRoute)
app.use(writeArticleRoute)
app.use(previewRoute)
app.use(upload_image_route)
const checker = require("./middlewares/signInUpChecker")
app.get("/signIn", checker, (req, res) => {
    res.render("./signIn.ejs", )
})
app.get("/signUp", checker, (req, res) => {
    res.render("./signUp.ejs", )
})

app.listen(port, (err) => {
    console.log("listening")

});