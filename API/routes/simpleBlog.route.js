const express = require('express'),
    simpleBlogRoutes = express.Router();
const dataConfig = require("../config/data");
const config = require("../config/config");
const dbUtil = require("../database/database");
const log = require("../tools/logger");

simpleBlogRoutes.all("/" , (req,res) => {
    res.send("Hello world");
});


simpleBlogRoutes.get("/generate", (req, res) => {
    dbUtil.insertDocument(config.database.collection, dataConfig.articles, res);
});

// Récupère tous les documents
simpleBlogRoutes.get("/posts", (req, res) => {
    dbUtil.getAllDocument(config.database.collection, res);
});
// Récupère un seul document
simpleBlogRoutes.get("/posts/:id", (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    dbUtil.getDocumentByID(config.database.collection, _id, res);
});

// Update un seul document
simpleBlogRoutes.put("/posts/:id", (req, res) => {
    const _id = req.params.id;
    dbUtil.findDocumentByIdAndUpdate(config.database.collection, _id, req.body, res);
});
simpleBlogRoutes.delete("/posts/:id", (req, res) => {
    const _id = req.params.id;
    console.log("delete");
    dbUtil.findDocumentByIdAndDelete(config.database.collection, _id, res);
});

simpleBlogRoutes.post('/posts', (req, res) => {
    dbUtil.insertDocument(config.database.collection, req.body, res);
});

module.exports = simpleBlogRoutes;
