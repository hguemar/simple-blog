module.exports = function (app) {
    app.get("/api/article/all", function (req, res) {
        app.db.collection("articles").find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    app.get("/api/article/:id", function (req, res) {
        let query = {_id: app.ObjectId(req.params.id)};
        app.db.collection("articles").findOne(query, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    app.post("/api/article", function (req, res) {
        let body = req.body;
        let type = body.type;
        switch (type) {
            case "DELETE":
                let id = body.id;
                let query = {_id: app.ObjectId(id)};
                app.db.collection("articles").remove(query, true);
                break;
            case "CREATE":
                let article = body.article;
                app.db.collection("articles").insertOne(article, function(err, res) {
                    if (err) throw err;
                    console.log("Article '" + article.title + "' added.");
                });
                break;
        }
    });
};
