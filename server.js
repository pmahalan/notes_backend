// Dependencies
// =============================================================
var express = require("express");
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");

var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);



app.listen(PORT, function() {
  //console.log(app);
  console.log("App listening on PORT " + PORT);
});
  
