var express = require("express");
var MongoClient = require("mongodb");
var bodyParser = require('body-parser')
var cons = require('consolidate');

var app = express();
var url = process.env.URL || "mongodb://localhost:27017";
var dbName = process.env.DBNAME || "simpleblog";
var port = process.env.PORT || 8000;
app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views',  __dirname +  '/views');
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

var routes = require("./routes");


MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
  if(err) console.error(err.message);

  routes(app);
  
  app.client = client;
  app.db = client.db(dbName);

  app.listen(port, function() {
    console.log("now listening on http://localhost:" + port);
  });
});

module.exports = app;
