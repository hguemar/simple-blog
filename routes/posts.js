var ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

module.exports = function(app) {
  app.get("/post/create", function(req, res) {
    res.render("creation");
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.post("/post/create", function(req, res) {
    var date = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    req.body.date = date.toLocaleDateString('fr-FR', options);

    app.db.collection("article").insertOne(req.body);
    
    res.redirect('/');

  });

  app.get("/post/:id", function(req, res) {

    var id = new ObjectId(req.params.id);

    app.db.collection('article').findOne({ "_id": id }, function(err, result){
      res.render('article', {article: result});
    });
  });

  app.get("/post/suppr/:id", function(req, res) {
    var id = new ObjectId(req.params.id);

    app.db.collection('article').deleteOne({ "_id": id });

    res.redirect('/');
  });
}
