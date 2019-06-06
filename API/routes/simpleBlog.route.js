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

simpleBlogRoutes.get("/posts", (req, res) => {
    dbUtil.getAllDocument(config.database.collection, res);
});
simpleBlogRoutes.get("/posts/:id", (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    dbUtil.getDocumentByID(config.database.collection, _id, res);
});

module.exports = simpleBlogRoutes;
