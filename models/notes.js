const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NotesSchema = new Schema({
    name: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    }
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;