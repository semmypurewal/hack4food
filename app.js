var express = require("express"),
    app = express(),
    textController = require("./controllers/text_controller.js")(),
    communityController = require("./controllers/community_controller.js")(),
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

app.post("/communities", communityController.create);
app.get("/communities.json", communityController.list);
app.get("/communities/:community.json", communityController.show);
app.post("/text", textController.incoming);
