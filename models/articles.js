const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticlesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "img",
    }
});

const Articles = mongoose.model("Articles", ArticlesSchema);

module.exports = Articles;