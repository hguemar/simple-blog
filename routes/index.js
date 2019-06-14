var posts = require("./posts");

module.exports = function(app) {

  app.get("/", function(req, res) {

    app.db.collection('article').find().toArray(function(err, result)
    {
      res.render('index', {'articles':result});
    });
  });

  // Register posts endpoint
  posts(app);
}
