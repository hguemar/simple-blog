const express = require("express");
const MongoClient = require("mongodb");
const bodyParser = require('body-parser');
const cons = require('consolidate');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors(corsOptions));

const MONGO_URL_START = "mongodb://";
const MONGO_HOST = process.env.HOST || "localhost";
const MONGO_PORT = process.env.PORT || 27017;
const MONGO_DB_NAME = process.env.DBNAME || "blog";
const MONGO_URL = MONGO_URL_START + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DB_NAME;
const port = process.env.PORT || 8000;

// app.engine('html', cons.pug);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/views');
app.use('/', express.static('angular-blog/dist/angular-blog/'));

var routes = require("./routes");

MongoClient.connect(MONGO_URL, function (err, client) {
    if (err) throw err;

    routes(app);

    app.client = client;
    app.db = client.db(MONGO_DB_NAME);
    app.ObjectId = MongoClient.ObjectId;

    app.listen(port, function () {
        console.log("now listening on http://localhost:" + port)
    });
});

module.exports = app;
