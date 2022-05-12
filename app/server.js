var express = require('express')
    , http = require('http')
    , path = require('path')
    , bodyParser = require('body-parser')
    , app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, function () {
    console.log("app listening on port 3000!");
});
