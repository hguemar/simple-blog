/**
 * Définition des constantes nécessaires à la création du serveur Express
 */
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet');

const port = 2110;
const simpleBlogRoutes = require("./routes/simpleBlog.route");

/**
 * Création du serveur Express
 * Ajout de l'entete CORS pour autoriser les requêtes cross-domain
 * Sécurisation du serveur avec helmet qui retire notamment l'entete x-powered-by qui cause des failles de sécurité
 */
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use("/server", simpleBlogRoutes);

/**
 * Démarrage du serveur sur le port
 * @param port Port sur lequel le serveur sera lancé
 * @type {http.Server}
 */
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
