const router = require("express").Router();
const store = require("../db/store");

//GET /api/notes responds with all notes from teh db

router.get("/notes", function(req, res) {
    store
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
});

router.post("/notes", function(req, res) {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err))
});

router.delete("/notes/:id", function(req, res) {
    store
    .removeNote(req.params.id)
    .then(() => res.json( {ok: true} ))
    .catch(err => res.status(500).json(err))
});

module.exports = router;

//THIS IS ONE OF THE BACKEND DOCUMENTS