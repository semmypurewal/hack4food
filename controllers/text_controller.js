var twilio = require("twilio"),
    TextController;

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
