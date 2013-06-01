var twilio = require("twilio"),
    Text = require("../models/Text.js"),
    TextController;

var t = new Text({
    "number":"555555555",
    "body": "hello world!",
});

t.save(function (err, result) {
    if (err !== null) {
        console.log("OMG error!: " + err);
    } else {
        console.log("We saved " + result);
    }
});

TextController = function () {
    //make controller new agnostic
    if (!(this instanceof TextController)) {
        return new TextController();
    }

    this.incoming = function (req, res) {
        //check to make sure from twilio

        var twiml = new twilio.TwimlResponse(),
            body = req.body.Body,
            date = new Date(),
            phoneNumber;

        //create new model instance
        //which figures out the community

        //twiml
        res.type('text/xml');
        res.send(twiml.toString());
    };
};

module.exports = TextController;
