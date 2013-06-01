var Text = require("./text.js"),
    mongoose = require("mongoose"),
    CommunitySchema,
    Community;

TextSchema = new mongoose.Schema({
    "phone" : String,
    "body" : String,
    "date" : { type: Date, default: Date.now }
});

CommunitySchema = new mongoose.Schema({
    name: {type: String, unique: true },
    texts: [ TextSchema ]
});

Community = mongoose.model("Community", CommunitySchema);

module.exports = Community;
