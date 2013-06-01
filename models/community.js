var Text = require("./text.js"),
    mongoose = require("mongoose"),
    CommunitySchema,
    Community;

CommunitySchema = new mongoose.Schema({
    texts: [Text]
});

module.exports = Community;
