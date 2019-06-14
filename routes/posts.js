var ObjectId = require('mongodb').ObjectID;

module.exports = function(app) {
  // Page pour créer un nouvel article
  app.get("/post/create", function(req, res) {
    // Chargement du template addArticle
  	res.render("addArticle");
  });

  // Récupération du submit du formulaire de création d'un article
  app.post("/post/create", function(req, res) {
  	try {
        // Récupération des données du formulaire + tronquage des élément si trop grand + transformation date en timestamp
  	  	let post =  {
  	  		titre: req.body.titre.toString().length > 50 ? req.body.titre.toString().substring(0, 50) : req.body.titre,
  	  		date: (new Date(req.body.date.toString().replace('-', '/')).getTime() / 1000),
  	  		auteur: req.body.auteur.toString().length > 20 ? req.body.auteur.toString().substring(0, 20) : req.body.auteur,
  	  		resume: req.body.resume.toString().length > 120 ? req.body.resume.toString().substring(0, 120) : req.body.resume,
  	  		texte: req.body.texte
  	  	};

      // Insertion dans la BDD
  		app.db.collection("article").insertOne(post);

      // Redirection vers l'index du site
  		res.redirect('/');
  	} catch (e) {
  	   console.log(e);
  	};
  });

  // Suppresion d'un article
  app.get("/post/delete/:id", function(req, res) {
  	try {
      // Récupération de l'id
  		let query = { _id: ObjectId(req.params.id) };
      // Suppression en BDD
		  app.db.collection("article").deleteOne(query);

      // Redirection vers l'index du site
		  res.redirect('/');
  	} catch(e) {
  		console.log(e);
  	}
  });

  // Page d'affichage d'un article
  app.get("/post/:id", function(req, res) {
    // Récupération de l'article en BDD selon id passé en paramètre
  	let query = { _id: ObjectId(req.params.id) };
  	app.db.collection("article").find(query).toArray(function(err, result) {
  		if(err) throw err;

  		if(typeof(result[0]) !== 'undefined') {
          // Transformation du timestamp pour qu'il soit lisible + tronquage des données au cas où elles soient trop grandes
  			 let ts_hms = new Date(result[0].date*1000);
  			 result[0].titre = result[0].titre.toString().length > 50 ? result[0].titre.toString().substring(0, 50) : result[0].titre;
  			 result[0].auteur = result[0].auteur.toString().length > 20 ? result[0].auteur.toString().substring(0, 20) : result[0].auteur;
			   result[0].date = ts_hms.getDate().toString().padStart(2, "0") + "/" + ts_hms.getMonth().toString().padStart(2, "0") + "/" + ts_hms.getFullYear().toString().padStart(4, "0");
			   result[0].resume = result[0].resume.toString().length > 120 ? result[0].resume.toString().substring(0, 120) : result[0].resume;

         // Chargement du template displayArticle
  			 res.render("displayArticle", result[0]);
  		}
  	});
  });
}