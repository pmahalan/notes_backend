const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//each of the methods contained in the constructor function below deal with managing notes in db.json.
//each note in db.json has a unique 'id' property. 
//Because of this, 'this.lastId' in the constructor function enables the app to understand that any of the following methods that are invoked pertain to 'THIS' note.
//For instance, the method 'addSpectacularNote' enables the app to let the user add as many new notes as they would like; 
//through the use of a constructor function, the same functionality is going to be applied to each and every new note generated.
//each new note will have properties of title, text and id; each of them will need to have a title and some text in order to be saved as a note.


class HandyDandyStorageMechanism {
    constructor () {
        this.lastId = 0;
    }

    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getAwesomeNotes() {
        return this.read().then(notes => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        })
    }

    addSpectacularNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text cannot be blank");
        }

        const newNote = {title, text, id: ++this.lastId};

        return this.getAwesomeNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => newNote)
    }

    removeUnwantedNote(id) {
        return this.getAwesomeNotes()
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new HandyDandyStorageMechanism();