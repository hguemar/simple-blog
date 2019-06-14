var posts = require("./posts");

module.exports = function(app) {

  // Page index principale
  app.get("/", function(req, res) {
  	// Récupère tout les article de la BDD
  	app.db.collection("article").find({}).toArray(function(err, result) {
  		if(err) throw err;
  		if(typeof(result) !== 'undefined') {
  			result.forEach(function(element) {
  				// Modifie le timestamp de la date en date lisible par l'homme + tronquage des données au cas où elles soient trop grande
  				let ts = new Date(element.date*1000);
  				element.titre = element.titre.toString().length > 50 ? element.titre.toString().substring(0, 50) : element.titre;
				element.date = ts.getDate().toString().padStart(2, "0") + "/" + ts.getMonth().toString().padStart(2, "0") + "/" + ts.getFullYear().toString().padStart(4, "0");
				element.auteur = element.auteur.toString().length > 20 ? element.auteur.toString().substring(0, 20) : element.auteur;
				element.resume = element.resume.toString().length > 120 ? element.resume.toString().substring(0, 120) : element.resume.toString();
  			});
  			// Affichage des articles avec le template displayArticles
    		res.render("displayArticles", {data: result});
  		}
  	});
  });

  // Register posts endpoint
  posts(app);
}
