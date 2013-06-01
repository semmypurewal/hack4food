var mongoose = require("mongoose"),
    TextSchema,
    Text;

TextSchema = new mongoose.Schema({
    "phone" : String,
    "body" : String,
    "date" : { type: Date, default: Date.now }
});

Text = mongoose.model("Text", TextSchema);

module.exports = Text;

