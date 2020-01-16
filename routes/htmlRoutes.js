var path = require("path")
var router = require("express").Router();

router.get(`*`, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
//you need to change each of these to be looked for under develop --> public.
//the one from line for is "index.html"
//the one below is "notes.html"

router.get(`/notes`, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  module.exports = router;