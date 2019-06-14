var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var ut = require ('./utilities-generate.js');
var dbName = 'blog';
var randomDate;
var randomTitle;
var randomBody;
var randomSummary;

MongoClient.connect(url, function(err, client) {
    db = client.db(dbName);
    randomTitle = ut.makeString(5);
    randomBody = ut.makeString(80);
    randomSummary = ut.makeString(20);
    randomDate = ut.randomDate(new Date(2012, 0, 1), new Date());
    var myobj = { title: randomTitle, body: randomBody, summary: randomSummary, date: randomDate };
  
    db.collection("article").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });

    db.collection("article").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  });

