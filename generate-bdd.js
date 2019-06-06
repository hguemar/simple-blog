var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var ut = require ('./utilities-generate.js');
var dbName = 'blog';
var theRandomDate;
var theRandomTitle;
var theRandomCorp;
var theRandomResume;

MongoClient.connect(url, function(err, client) {
    db = client.db(dbName);
    console.log(ut);
    theRandomTitle = ut.makeString(5);
    theRandomCorp = ut.makeString(80);
    theRandomResume = ut.makeString(20);
    theRandomDate = ut.randomDate(new Date(2012, 0, 1), new Date());
    var myobj = { titre: theRandomTitle, corp: theRandomCorp, resume: theRandomResume, date: theRandomDate };
  
    db.collection("article").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });

      db.collection("article").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      });
  });

