var posts = require("./posts");

module.exports = function(app) {

  // GET ALL THE ARTICLES
  var allPosts = {'posts': ['post1', 'post2', 'post3', 'post4']};

  app.get("/", function(req, res) {
    res.render("index", allPosts);
  });

  // Register posts endpoint
  posts(app);
}
