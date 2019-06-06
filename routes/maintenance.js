module.exports = function(app) {

  // Delete all posts in the database
  // In prod, would be protected by a password and not delivered to the client
  app.get('/empty', function(req, res) {

    app.db.collection('post').remove({}, async function(err, doc) {
      res.send("BDD vidée.");
    });
  });
  // Create a set of posts
  app.get('/populate', function(req, res) {
    res.redirect("/");
  });
}

