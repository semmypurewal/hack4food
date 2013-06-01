var express = require("express"),
    app = express(),
    TextController = require("./controllers/text_controller.js")(),
    server = require("http").createServer(app).listen(process.env.PORT || 3001);

var numTexts = 0;

app.configure(function () {
    app.use(express.static("public"));
    app.use(express.bodyParser());
});

app.get("/", function (req, res) {
    res.send("Welcome to the hack4food app! " + numTexts);
});

app.post("/text", function (req, res) {
    
});

