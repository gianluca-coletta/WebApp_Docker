// var express = require('express')
//   , http = require('http')
//   , path = require('path')
//   , bodyParser = require('body-parser')
//   , app = express()
//   , fs = require('fs')
//   , MongoClient = require('mongodb').MongoClient;

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// // use when starting application locally
// var mongoUrlLocal = "mongodb://admin:password@localhost:27017/";

// // use when starting application as docker container
// var mongoUrlDocker = "mongodb://admin:password@mongodb";
// var url = "mongodb://localhost:27017/teacher-db";

// let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// var databaseName = "teacher-db";

// MongoClient.connect(mongoUrlLocal, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// MongoClient.connect(mongoUrlLocal, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db(databaseName);


//   dbo.listCollections().toArray(function (err, collections) {
//     if (collections.length === 0) {
//       dbo.createCollection("teachers", function (err, res) {
//         if (err) throw err;
//         console.log("Collection created");
//         db.close();
//       });
//       var myobj = [
//         { name: 'Paolo', provincia: 'Perugia', materia: 'Matematica', recapito_telefonico: '3503249301' },
//         { name: 'Marco', provincia: 'Terni', materia: 'Inglese', recapito_telefonico: '3503533012' },
//         { name: 'Alessandro', provincia: 'Roma', materia: 'Matematica', recapito_telefonico: '3306909301' },
//         { name: 'Giovanni', provincia: 'Perugia', materia: 'Fisica', recapito_telefonico: '3335669301' },
//         { name: 'Luca', provincia: 'Perugia', materia: 'Italiano', recapito_telefonico: '3405567301' },
//         { name: 'Matteo', provincia: 'Terni', materia: 'Fisica', recapito_telefonico: '3503288801' }
//       ];
//       dbo.collection("teachers").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//       });
//     }
//   });
// });

// app.listen(3000, function () {
//   console.log("app listening on port 3000!");
// });
