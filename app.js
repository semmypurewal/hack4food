var express = require("express"),
    app = express(),
    textController = require("./controllers/text_controller.js")(),
    mongoose = require("mongoose"),
    mongoServer,
    Community = require("./models/community.js"),
    server = require("http").createServer(app).listen(process.env.PORT || 3001);

var numTexts = 0;

app.configure(function () {
    app.use(express.static("public"));
    app.use(express.bodyParser());
    mongoServer = process.env.MONGOHQ_URL || "mongodb://localhost/hack4food_development";
    console.log(mongoServer);
});

mongoose.connect(mongoServer);

app.get("/", function (req, res) {
    res.sendFile("index.html");
});

app.post("/communities", function (req, res) {
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
});

app.get("/communities/:community.json", function (req, res) {
    Community.findOne({"name":req.params.community}, function (err, result) {
        if (err !== null) {
            res.send(500);
        } else if (result === null) {
            res.send(404);
        } else {
            res.json(result.texts);
        }
    });
});

app.post("/text", function (req, res) {
    numTexts++;
    textController.incoming(req, res);
});

