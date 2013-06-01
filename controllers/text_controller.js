var twilio = require("twilio"),
    Text = require("../models/text.js"),
    Community = require("../models/community.js"),
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
            community = "other",
            phoneNumber = req.body.From;

        Community.find(function (err, results) {
            var communities;

            if (err !== null) {
                res.send(500);
            } else {
                communities = results.map(function (comm) {
                    return comm.name;
                });

                communities.forEach(function (comm) {
                    console.log("we're checking comm " + comm);
                    if (body.toLowerCase().indexOf(comm) > -1) {
                        console.log("got it!");
                        community = comm;
                    }
                });
            }

            Community.findOne({"name":community}, function (err, comm) {
                if (err !== null) {
                    res.send(500);
                } else {
                    comm.texts.push({
                        "body": body,
                        "phone":phoneNumber
                    });
                    
                    comm.save(function (err, result) {
                        if (err !== null) {
                            res.send(500);
                        }
                    });
                }
            });
        });



        //twiml
        res.type('text/xml');
        res.send(twiml.toString());
    };
};

module.exports = TextController;
