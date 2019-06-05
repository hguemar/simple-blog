var posts = require("./posts");

module.exports = function (app) {

  app.get('/', function (_req, res) {
    app.db.collection('posts').find({}).sort({ date: -1 }).toArray(function (err, doc) {
      res.render('home', { list: doc });
    });
  });


  // Register posts endpoint
  posts(app);


  // Catch all other URL as not found error
  app.get('*', function (req, res) {
    res.send('Page not found', 404);
  });

}
