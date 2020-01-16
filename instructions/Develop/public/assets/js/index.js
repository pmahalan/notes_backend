var $masterJedi = $(".yoda");
var $redGuy = $(".darth-maul");
var $fallenJedi = $(".anikin");
var $badActing = $(".padme");
var $droids = $(".r2d2 .3p0");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db.
// "Should read the db.json file and return all saved notes as JSON."
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
// "Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client."
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
// "Should recieve a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved."
// "In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property,"
// "and then rewrite teh notes to the db.json file."
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  $fallenJedi.hide();

  if (activeNote.id) {
    $masterJedi.attr("readonly", true);
    $redGuy.attr("readonly", true);
    $masterJedi.val(activeNote.title);
    $redGuy.val(activeNote.text);
  } else {
    $masterJedi.attr("readonly", false);
    $redGuy.attr("readonly", false);
    $masterJedi.val("");
    $redGuy.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $masterJedi.val(),
    text: $redGuy.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$masterJedi.val().trim() || !$redGuy.val().trim()) {
    $fallenJedi.hide();
  } else {
    $fallenJedi.show();
  }
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  $droids.empty();

  var epicNotesArray = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    epicNotesArray.push($li);
  }

  $droids.append(epicNotesArray);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$fallenJedi.on("click", handleNoteSave);
$droids.on("click", ".list-group-item", handleNoteView);
$badActing.on("click", handleNewNoteView);
$droids.on("click", ".delete-note", handleNoteDelete);
$masterJedi.on("keyup", handleRenderSaveBtn);
$redGuy.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();