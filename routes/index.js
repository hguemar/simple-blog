var posts = require("./posts");

module.exports = function(app) {

  app.get("/", function(req, res) {
    
    app.db.collection("article").find().toArray(function(err, result) {
      if (err) throw err;
      //console.log({'articles': result});
      res.render("index", {'articles': result});
    });

    app.get("/new", function(req, res) {
	    res.render("newArticleForm");
    });

  });

  // Register posts endpoint
  posts(app);
}
