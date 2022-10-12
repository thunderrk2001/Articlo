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
const writeArticleRoute = require("./routes/writeArticleRoute")
const signIn = require("./routes/signInRoute")
const signUp = require("./routes/signUpRoute")
const signOut = require("./routes/signOut")
const just = require("./routes/justPost")
const previewRoute = require("./routes/previewRoute")
const upload_image_route = require("./routes/uploadImage")
const myArticleRoute = require("./routes/myArticles")
const image_rt = require("./routes/image_cnt")
const home_route = require("./routes/home")
const searchRoute = require("./routes/search")
const path = require("path");
app.set('view engine', 'ejs');
const mongo = require("mongoose")
mongo.connect(process.env.dbId, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("mongodb connected")).catch(e => console.log("mongo errror" + " : " + e))
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
app.use(signOut)
app.use(just)
app.use(writeArticleRoute)
app.use(myArticleRoute)
app.use(previewRoute)
app.use(upload_image_route)
app.use(searchRoute)

const checker = require("./middlewares/signInUpChecker")
app.get("/signIn", checker, (req, res) => {
    res.render("./signIn.ejs", )
})
app.get("/signUp", checker, (req, res) => {
        res.render("./signUp.ejs", )
    })
    //If route is not present in above roots
app.use((req, res, next) => {
    res.status(404).render("./errorView.ejs", { error: "It is Pointing to singularity.." })
});
app.listen(port, (err) => {
    console.log("listening")

});