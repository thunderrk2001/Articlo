const mongo = require("mongoose")
mongo.connect(process.env.dbId, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("mongodb connected")).catch(e => console.log("mongo errror" + " : " + e))
const model = mongo.model("userArticles", {
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }


})
module.exports = model