const mongo = require("mongoose")
mongo.connect(process.env.dbId, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("mongodb connected")).catch(e => console.log("mongo errror" + " : " + e))
var sch = new mongo.Schema({
    token: {
        type: String,
        required: true,
    }

})
const model = mongo.model("blacklistedAuthTokens", sch)
module.exports = model