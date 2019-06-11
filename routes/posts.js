module.exports = function(app) {
  app.get("/post/create", function(req, res) {
    
    res.send("XXX");
  });

  app.post("/post/create", function(req, res) {

    var myobj = { title: req.body.titre, body: req.body.corps, summary: req.body.resume, date: req.body.date };
  
    app.db.collection("article").insertOne(myobj, function(err, res) {
      if (err) throw err;
    });
    res.render("insertConfirmation");
    console.log(myobj);
  });

  app.get("/post/:id", function(req, res) {
    var ObjectId = require("mongodb").ObjectID;
    app.db.collection("article").find({ _id: ObjectId(req.params.id) }).toArray(function(err, result) {
      if (err) throw err;
      console.log({'articleDetail': result});
      res.render("article", {'articleDetail': result});
    });
  });

  app.get("/delete/:id", function(req, res) {
    var ObjectId = require("mongodb").ObjectID;
    app.db.collection("article").remove({ _id: ObjectId(req.params.id) });
    res.render("deleteConfirmation");
  });
}
