var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

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

let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let databaseName = "teachers";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient.connect(mongoUrlLocal, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(mongoUrlLocal, function (err, db) {
  if (err) throw err;
  var dbo = db.db(databaseName);


  dbo.listCollections().toArray(function (err, collections) {
    if (collections.length === 0) {
      dbo.createCollection("teachers", function (err, res) {
        if (err) throw err;
        console.log("Collection created");
        db.close();
      });
      var myobj = [
        {nome: 'Folco', cognome: 'Giorgetti', materie: ['Matematica', 'Fisica','Inglese'], città: 'Perugia', telefono: '3569638798'},
        {nome: 'Gianluca', cognome: 'Coletta', materie: ['Matematica', 'Fisica'], città: 'Perugia', telefono: '3403326423'},
        {nome: 'Leonardo', cognome: 'Lorenzi', materie: ['Chimica'], città: 'Perugia', telefono: '3324567891'},
        {nome: 'Riccardo', cognome: 'Tusino', materie: ['Latino', 'Inglese'], città: 'Bari', telefono: '3329781204'},
        {nome: 'Pietro', cognome: 'Farsi ', materie: ['Matematica', 'Fisica','Inglese', 'Latino'], città: 'Milano', telefono: '3339012343'},
        {nome: 'Gabriele', cognome: 'Marroni', materie: ['Economia', 'Informatica'], città: 'Milano', telefono: '3215647890'},
      ];
      dbo.collection("teachers").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
      });
    }
  });
});

app.post('/get-insegnante', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let città = req.body.città;
    let materia = req.body.materia;
    //console.log(città);
    let myquery = {$and: [{città: città}, {materie: materia}]};

    db.collection("teachers").find(myquery).toArray(function(err, result)  {
      if (err) throw err;
      response = result;
      console.log(response);
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

/*app.post('/get-select', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    //let città = req.body.città;
    //let materia = req.body.materia;
    //console.log(città);
    let myquery = { nome: "Folco" };

    const test = db.collection("teachers").distinct("cognome", myquery);
    console.log(test);
  });
});*/


