var express = require("express"),
    app = express(),
    server = require("http").createServer(app).listen(process.env.PORT || 3001),
    twilio = require("twilio");

var temp = "nothing";


app.configure(function () {
    app.use(express.static("public"));
    app.use(express.bodyParser());
});

app.get("/", function (req, res) {
    res.send(temp);
});

app.get("/hello", function (req, res) {
    res.send("hello world!");
});

app.post("/text", function (req, res) {
    var twiml = new twilio.TwimlResponse();
    temp = req.body;
    //twiml
    console.log(req.body);
    res.type('text/xml');
    res.send(twiml.toString());
});

