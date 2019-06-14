module.exports = function (app) {
    // Route permettant de récupérer la liste de tous les articles
    app.get("/api/article/all", function (req, res) {
        app.db.collection("articles").find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    // Route permettant de récupérer un article à partir de son id en paramètres
    app.get("/api/article/:id", function (req, res) {
        let query = {_id: app.ObjectId(req.params.id)};
        app.db.collection("articles").findOne(query, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

    // Route permettant de créer ou de supprimer un article selon le type donné dans le body
    app.post("/api/article", function (req, res) {
	console.log("/api/article");
        let body = req.body;
        let type = body.type;
        switch (type) {
            case "DELETE":
		// Suppression d'un article
		console.log("DELETE");
                let id = body.id;
                let query = {_id: app.ObjectId(id)};
                app.db.collection("articles").deleteOne(query, true);
                break;
            case "CREATE":
		// Création d'un article
		console.log("CREATE");
                let article = body.article;
                app.db.collection("articles").insertOne(article, function(err, res) {
                    if (err) throw err;
                    console.log("Article '" + article.title + "' added.");
                });
                break;
        }
    });
};
