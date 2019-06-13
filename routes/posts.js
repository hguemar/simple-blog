const ObjectId = require('mongodb').ObjectID;

module.exports = (app) => {
  app.get('/post/create', (req, res) => {
    res.render('create');
  });

  app.post('/post/create', (req, res) => {
    app.db.collection('posts').insertOne({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      date: new Date()
    }, (err, _res) => {
      if (err) throw err;
      console.log('post created successfully');
      res.redirect('/');
    });
  });

  app.get('/post/:id', (req, res) => {
    try {
      app.db.collection('posts').findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
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

  app.post('/post/:id', (req, res) => {
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
      }, (err, result) => {
        res.redirect(req.url);
      });
  });

  app.delete('/post/:id', (req, res) => {
    app.db.collection('posts').deleteOne({
      _id: ObjectId(req.params.id)
    }, (err, result) => {
      res.send('Post deleted');
    });
  });
};
