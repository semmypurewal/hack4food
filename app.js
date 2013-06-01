var express = require("express"),
    app = express(),
    textController = require("./controllers/text_controller.js")(),
    mongoose = require("mongoose"),
    mongoServer,
    server = require("http").createServer(app).listen(process.env.PORT || 3001);

var numTexts = 0;

app.configure(function () {
    app.use(express.static("public"));
    app.use(express.bodyParser());
    mongoServer = process.env.MONGOHQ_URL || "mongodb://localhost/hack4food_development";

    console.log(mongoServer);
});

app.get("/", function (req, res) {
    res.send("Welcome to the hack4food app! " + numTexts);
});

app.post("/text", function (req, res) {
    numTexts++;
    textController.incoming(req, res);
});

