const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

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