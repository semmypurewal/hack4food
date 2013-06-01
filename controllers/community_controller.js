var Community = require("../models/community.js"),
    CommunityController;

CommunityController = function () {
    if (!(this instanceof CommunityController)) {
        return new CommunityController();
    }

    this.create = function (req, res) {
        var c;

        if (req.body.name === undefined) {
            res.send(400);
        } else {
            c = new Community({"name":req.body.name});
            c.save(function (err, result) {
                if (err !== null) {
                    res.send(500);
                } else {
                    res.send(200);
                }
            });
        }        
    };

    this.show = function (req, res) {
        Community.findOne({"name":req.params.community}, function (err, result) {
            var texts;

            if (err !== null) {
                res.send(500);
            } else if (result === null) {
                res.send(404);
            } else {
                texts = result.texts.map(function (text) {
                    var timestamp = new Date(text.date).getTime();

                    return {
                        "body":text.body,
                        "date":timestamp,
                        "phone":text.phone
                    }
                });
                
                res.json(texts);
            }
        });
    };

    this.destroy = function (req, res) {
        
    };
};


module.exports = CommunityController;
