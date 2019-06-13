const express = require("express");
const MongoClient = require("mongodb");
const bodyParser = require('body-parser')
const cons = require('consolidate');
const path = require('path');

const app = express();
const url = process.env.URL || "mongodb://localhost:27017";
const dbName = process.env.DBNAME || "test";
const port = process.env.PORT || 8000;

app.engine('html', cons.pug);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '/static')));


var routes = require("./routes");

MongoClient.connect(url, (err, client) => {
  if (err) throw err;

  routes(app);

  app.client = client;
  app.db = client.db(dbName);

  app.listen(port, () => {
    console.log("now listening on http://localhost:" + port)
  });
});

module.exports = app;