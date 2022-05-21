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

// Rendering index.html

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let mongoUrlDocker = "mongodb://admin:password@mongodb";
let databaseName = "teachers";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient.connect(mongoUrlDocker, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

// Database

MongoClient.connect(mongoUrlDocker, function (err, db) {
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
        { nome: 'Folco', cognome: 'Giorgetti', materie: ['Matematica', 'Fisica', 'Inglese'], città: 'Perugia', telefono: '3569638798' },
        { nome: 'Gianluca', cognome: 'Coletta', materie: ['Matematica', 'Fisica'], città: 'Perugia', telefono: '3403326423' },
        { nome: 'Leonardo', cognome: 'Lorenzi', materie: ['Chimica'], città: 'Perugia', telefono: '3324567891' },
        { nome: 'Riccardo', cognome: 'Tusino', materie: ['Latino', 'Inglese'], città: 'Bari', telefono: '3329781204' },
        { nome: 'Pietro', cognome: 'Farsi ', materie: ['Matematica', 'Fisica', 'Inglese', 'Latino'], città: 'Milano', telefono: '3339012343' },
        { nome: 'Paolo', cognome: 'Rossi', materie: ['Matematica', 'Informatica'], città: 'Milano', telefono: '3315622289' },
        { nome: 'Michele', cognome: 'Verdi', materie: ['Chimica', 'Biologia'], città: 'Bari', telefono: '3334568975' },
        { nome: 'Gianni', cognome: 'Bianchi', materie: ['Fisica', 'Matematica', 'Inglese', 'Informatica'], città: 'Terni', telefono: '3405695872' },
        { nome: 'Benedetta', cognome: 'Mancinelli', materie: ['Economia', 'Matematica'], città: 'Terni', telefono: '3506891235' },
        { nome: 'Paola', cognome: 'Verdi', materie: ['Fisica'], città: 'Terni', telefono: '3405623215' },
        { nome: 'Francesco', cognome: 'Pirelli', materie: ['Fisica', 'Informatica'], città: 'Bari', telefono: '3403692581' },
        { nome: 'Gianfranco', cognome: 'Pirillo', materie: ['Inglese'], città: 'Terni', telefono: '3506981237' }
      ];
      dbo.collection("teachers").insertMany(myobj, function (err, res) {
        if (err) throw err;
      });
    }
  });
});

// Search request teacher

app.post('/get-insegnante', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let città = req.body.città;
    let materia = req.body.materia;
    let myquery = { $and: [{ città: città }, { materie: materia }] };

    db.collection("teachers").find(myquery).toArray(function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

// Select all subject and city from DB to fill in a list

app.post('/get-select', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let città = req.body.città;
    let materia = req.body.materia;

    db.collection("teachers").find({}, { projection: { città: 1, materie: 1, _id: 0 } }).toArray(function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

