module.exports = function(app) {
  app.get("/post/create", function(req, res) {
    
    res.send("XXX");
  });

  app.post("/post/create", function(req, res) {
    console.log(req.body);
    
    theTitle = req.body.titre;
    theCorps = req.body.corps;
    theResume = req.body.resume;
    theDate = req.body.date;
    var myobj = { titre: theTitle, corp: theCorps, resume: theResume, date: theDate };
  
    app.db.collection("article").insertOne(myobj, function(err, res) {
      if (err) throw err;
      
    });
    res.send("Vous avez réussi l'insertion");
    console.log(myobj);
  });

  app.get("/post/:id", function(req, res) {

    res.send("XXX");
  });
}
