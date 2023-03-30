const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    postedby: {
        type: String,
        required: true,
    },
    subgreddit: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    upvotes: {
        type: Array,
        default: [],
    },
    downvotes: {
        type: Array,
        default: [],
    },
    comments: {
        type: [
            {
                text: {
                    type: String,
                    required: true,
                },
                postedby: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
