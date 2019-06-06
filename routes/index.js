var posts = require("./posts");
var ObjectID = require('mongodb').ObjectID;

var postsPerPage = 2;

module.exports = function(app) {

  // Shows a list of all posts
  app.get('/', function(req, res) {
    // Get page
    var page = req.query.page;
    if (page === undefined || page < 0) page = 1;
    var range = req.query.range;
    if (range === undefined || range < 0 || 100 <= range) range = postsPerPage;
    var i = (page - 1) * range;

    app.db.collection('post').find().sort({_id:-1}).toArray(function(err, result) {
      if (err) throw err;

      //get page numbers
      var pagenumbers = [];
      var numberOfPages = result.length / postsPerPage;
      var pn = 0;
      while(numberOfPages > 0) {
        pagenumbers.push(++pn);
        numberOfPages--;
      }

      // get relevant posts
      var posts = [];
      while(result[i] !== undefined && range > 0) {
        posts.push(result[i]);
        i++;
        range--;
      }
      res.render("index",  { "posts": posts, "pages": pagenumbers });
    });
   });

  // Register posts endpoint
  posts(app);
}

