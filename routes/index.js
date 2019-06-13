var posts = require("./posts");
var utils = require("../utils");

module.exports = (app) => {

  app.get('/', (req, res) => {
    const actualPage = req.query.page ? req.query.page - 1 : 0;

    app.db.collection('posts')
      .find({})
      .sort({ date: -1 })
      .skip(5 * actualPage)
      .limit(5)
      .toArray((err, doc) => {
        app.db.collection('posts')
          .count((err, count) => {
            let pageNumber = Math.floor(count / 5) + 1;
            res.render('home', {
              list: doc,
              pages: utils.generatePageItems(pageNumber, actualPage),
            });
          });
      });
  });

  // Register posts endpoint
  posts(app);


  // Catch all other URL as not found error
  app.get('*', (req, res) => {
    res.send('Page not found', 404);
  });

}
