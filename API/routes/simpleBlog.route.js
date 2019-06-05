const express = require('express'),
    simpleBlogRoutes = express.Router();

simpleBlogRoutes.all("/" , (req,res) => {
    res.send("Hello world");
});

module.exports = simpleBlogRoutes;
