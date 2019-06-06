var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {

  // See a post with its comments
  app.get('/post', function(req, res) {
    // retrieve the postId and error management
    if(req.query.postId === undefined) {
      res.redirect("/post/latest");
      return;
    }
    var postId = ObjectID(req.query.postId);
    if(postId === undefined) {
      res.redirect("/post/latest");
      return;
    }

    app.db.collection('post').findOne({ _id: postId }, async function(err, doc) {
      if (doc.commentaires == undefined)
        doc.commentaires = [];
      res.render("post",  { "post": doc });
    });
  });

  // See the latest post
  app.get('/post/latest', function(req, res) {
    app.db.collection('post').find().sort({_id:-1}).limit(1).toArray(function(err, result) {
      // error management
      if (err) {
        res.send("Erreur pendant la recherche du dernier post :\n") + err;
        return;
      }
      else if (result === undefined || result[0] === undefined) {
        res.send("Erreur pendant la recherche du dernier post : élément non trouvé dans le tableau.\n") + result;
        return;
      }

      res.redirect("/post?postId=" + result[0]._id);
    });
  });

  // Comment a post
  app.post('/comment', function(req, res) {
    var postId = ObjectID(req.query.postId);
    var author = req.body.author;
    var content = req.body.content;
    var date = new Date();

    // error management
    if(postId === undefined || author === undefined || content === undefined
      || author === '' || content === '') {
      res.send("Erreur lors du post du commentaire.");
      return;
    }

    app.db.collection('post').update({ _id: postId }, {$push: { commentaires: { "auteur": author, "contenu": content, "date": date }}}, async function(err, doc) {
      res.redirect("/post?postId=" + req.query.postId);
      return;
    });
  });

  // Show the page to create a new post
  app.get("/post/create", function(req, res) {
    res.render("newPost");
  });
  // Create a new post
  app.post("/post/create", function(req, res) {
    var author = req.body.author;
    var title = req.body.title;
    var content = req.body.content;

    // error management
    if(author === undefined || author === undefined
      || content === undefined || content === undefined
      || title === undefined || title === undefined) {
      res.send("Erreur lors du post.");
      return;
    }

    app.db.collection('post').insert({"titre": title, "auteur":author, "contenu": content, "date": new Date(), "commentaires":[]}, async function(err, doc) {
      res.redirect("/post/latest");
      return;
    });
  });
  // Delete a post
  app.post("/post/delete", function(req, res) {
    // retrieve the postId and error management
    if(req.query.postId === undefined) {
      res.redirect("/");
      return;
    }
    var postId = ObjectID(req.query.postId);
    if(postId === undefined) {
      res.redirect("/post/");
      return;
    }

    app.db.collection('post').deleteOne({_id: postId}, function(err, obj) {
      if (err) throw err;
      res.redirect("/");
      return;
    });
  });
}
