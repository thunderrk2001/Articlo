const mongo = require("mongoose")
mongo.connect(process.env.dbId, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("mongodb connected")).catch(e => console.log("mongo errror" + " : " + e))
const model = mongo.model("image", {
    image_url: {
        type: String,
        required: true
    },
    userDataId: {
        type: String,
        required: true
    }
})
module.exports = model