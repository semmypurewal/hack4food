var express = require("express"),
    app = express(),
    server = require("http").createServer(app).listen(3001);

app.configure(function () {
    app.use(express.static("public"));
    app.use(express.bodyParser());
});

app.get("/hello", function (req, res) {
    res.send("hello world!");
});

