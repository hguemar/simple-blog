var posts = require("./posts");

module.exports = function(app) {

  // app.get("/", function(req, res) {
  //   res.sendFile(__dirname + "/../angular-blog/dist/angular-blog/index.html");
  // });

  // Register posts endpoint
  posts(app);
};
