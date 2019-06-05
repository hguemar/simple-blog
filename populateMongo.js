const MongoClient = require("mongodb");
const casual = require('casual');

const url = process.env.URL || "mongodb://localhost:27017";
const dbName = process.env.DBNAME || "test";

MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    db = client.db(dbName);
    for (let i = 0; i < 100; i++) {
        let title = casual.title;
        let body = casual.sentences(n = 30);
        let author = casual.full_name;
        db.collection('posts').insertOne({
            title: title,
            body: body,
            author: author,
            date: new Date()
        }, function (err, _res) {
            if (err) console.log(err);
        });
        console.log('posted')
    }
    console.log('finished')
});
