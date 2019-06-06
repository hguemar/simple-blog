var posts = require("./posts");

module.exports = function(app) {

  app.get("/", function(req, res) {
    
    app.db.collection("article").find().toArray(function(err, result) {
      if (err) throw err;
      console.log({'articles': result});
      res.render("index", {'articles': result});
    });

    app.get("/ajoutBlog", function(req, res) {
	    res.render("ajoutBlog");
    });

  });

  // Register posts endpoint
  posts(app);
}
