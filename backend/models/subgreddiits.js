const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subgredditSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
        required: true,
    },
    banned: {
        type: Array,
        default: [],
        required: true,
    },
    createdon: {
        type: Date,
        required: true,
    },
    moderator: {
        type: String,
        required: true,
    },
    normierequests: {
        type: Array,
        default: [],
        required: true,
    },
    bannednormies: {
        type: Array,
        default: [],
        required: true,
    },
    normies: {
        type: Array,
        default: [],
        required: true,
    },
    posts: {
        type: Array,
        default: [],
        required: true,
    },
    leftnormies: {
        type: Array,
        default: [],
        required: true,
    },
});

const Subgreddit = mongoose.model("Subgreddit", subgredditSchema);

module.exports = Subgreddit;
