var dbInit = [
  {
    "titre" : "Moi",
    "auteur" : "Moi",
    "contenu" : "Bienvenue dans mon petit monde, je m'appelle Moi et bisous ^^",
    "date" : new Date("2015-03-03T09:06:19.487Z"),
    "commentaires" : [
      { "auteur" : "Les autres", "contenu" : "L'Enfer", "date" : new Date("2016-06-06T08:29:58.580Z") },
      { "auteur" : "Anne", "contenu" : "O'Nyme :P", "date" : new Date("2017-01-06T09:29:58.580Z") }
    ],
  },
  {
    "titre" : "Ipsum",
    "auteur" : "Lorem",
    "contenu" : "Profound insights about life and stuff",
    "date" : new Date("2018-10-16T09:56:19.487Z"),
    "commentaires" : [
      { "auteur" : "Me", "contenu" : "Love it.", "date" : new Date("2019-06-06T08:29:58.580Z") },
      { "auteur" : "x", "contenu" : "#ME2", "date" : new Date("2019-06-06T09:29:58.580Z") }
    ],
  },
  {
    "titre" : "Ma passion",
    "auteur" : "Francky Vincent",
    "contenu" : "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "date" : new Date("2019-05-12T09:06:19.487Z"),
    "commentaires" : [
      { "auteur" : "Trololololo", "contenu" : "https://www.youtube.com/watch?v=oavMtUWDBTM", "date" : new Date("2019-06-01T08:29:58.580Z") },
      { "auteur" : "x", "contenu" : "lol mdr", "date" : new Date("2019-06-02T07:29:28.580Z") }
    ],
  }


];



module.exports = function(app) {

  // Delete all posts in the database
  // In prod, would be protected by a password and not delivered to the client
  app.get('/empty', function(req, res) {

    app.db.collection('post').remove({}, async function(err, doc) {
      res.send("BDD vidée.");
    });
  });
  // Create a set of posts
  // In prod, would be protected by a password and not delivered to the client
  app.get('/populate', function(req, res) {
    for(rec in dbInit) {
      app.db.collection('post').insert(dbInit[rec]);
    }
    res.redirect("/");
  });
}

