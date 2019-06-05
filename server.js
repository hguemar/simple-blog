const express = require('express');
const cons = require('consolidate');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const bodyParser = require('body-parser');

const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'test';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')

app.get('/', function (_req, res) {
    app.db.collection('posts').find({}).sort({ date: -1 }).toArray(function (err, doc) {
        res.render('home', { list: doc });
    });
});

app.get('/create', function (req, res) {
    res.render('create');
})

app.post('/create', function (req, res) {
    app.db.collection('posts').insertOne({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        date: new Date()
    }, function (err, _res) {
        if (err) throw err;
        console.log('post created successfully');
        res.redirect('/');
    });
});

app.get('/post/:id', function (req, res) {
    try {
        app.db.collection('posts').findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
            if (err) throw err;
            if (result)
                res.render('post', { post: result });
            else
                res.send('Post not found', 404);
        });
    } catch (_) {
        res.send('Post not found', 404);
    }
});

app.post('/post/:id', function (req, res) {
    app.db.collection('posts').update({
        _id: ObjectId(req.params.id)
    },
        {
            $push: {
                comments: {
                    content: req.body.comment,
                    date: new Date()
                }
            }
        }, function (err, result) {
            res.redirect(req.url);
        });
});

app.get('*', function (req, res) {
    res.send('Page not found', 404);
});

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, client) {
    app.client = client;
    app.db = client.db(dbName);
    app.listen(8000);
    console.log("Express server started on 8000");
});