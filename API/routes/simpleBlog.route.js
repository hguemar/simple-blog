const express = require('express'),
    simpleBlogRoutes = express.Router();
const dataConfig = require("../config/data");

simpleBlogRoutes.all("/" , (req,res) => {
    res.send("Hello world");
});


simpleBlogRoutes.get("/generate", (req, res) => {
    //TODO Remplir la base de données
    res.send(dataConfig.articles[0]);
});

module.exports = simpleBlogRoutes;
