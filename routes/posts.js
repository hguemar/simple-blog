const ObjectId = require('mongodb').ObjectID;

module.exports = function (app) {
  app.get("/post/create", function (req, res) {
    res.render('create');
  });

  app.post("/post/create", function (req, res) {
    app.db.collection('posts').insertOne({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      date: new Date()
    }, function (err, _res) {
      if (err) throw err;
      console.log('post created successfully');
      res.redirect('/');
    });
  });

  app.get("/post/:id", function (req, res) {
    try {
      app.db.collection('posts').findOne({ _id: ObjectId(req.params.id) }, function (err, result) {
        if (err) throw err;
        if (result)
          res.render('post', { post: result });
        else
          res.send('Post not found', 404);
      });
    } catch (_) {
      res.send('Post not found', 404);
    }
  });

  app.post('/post/:id', function (req, res) {
    app.db.collection('posts').update({
      _id: ObjectId(req.params.id)
    },
      {
        $push: {
          comments: {
            content: req.body.comment,
            date: new Date()
          }
        }
      }, function (err, result) {
        res.redirect(req.url);
      });
  });
}
