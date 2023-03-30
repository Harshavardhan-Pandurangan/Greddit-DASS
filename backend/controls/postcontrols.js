const Post = require("../models/posts");
const Subgreddit = require("../models/subgreddiits");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createPost = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(403).send({ error: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id != authData._id) {
            res.status(403).send({
                error: "You cannot make posts for other users",
            });
            return;
        }
    }

    if (req.body) {
        const subgreddiit = await Subgreddit.findById(req.body.subgreddiit);
        if (!subgreddiit.moderator) {
            res.status(404).send({ error: "Subgreddiit not found" });
            return;
        }
        // console.log(subgreddiit);
        // if (
        //     !subgreddiit.normies.includes(req.params.id) ||
        //     !subgreddiit.moderator == req.params.id
        // ) {
        //     res.status(403).send({
        //         error: "You are not allowed to post in this subgreddiit",
        //     });
        //     return;
        // }

        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            postedby: req.params.id,
            subgreddit: req.body.subgreddiit,
        });
        const createdPost = await post.save();
        subgreddiit.posts.push(createdPost._id);
        await subgreddiit.save();
        res.send(createdPost);
    } else {
        res.status(400).send({ error: "Bad request" });
    }
});

const getPosts = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(403).send({ error: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id != authData._id) {
            res.status(403).send({
                error: "You cannot get posts for other users",
            });
            return;
        }
    }

    if (req.body.id) {
        console.log("this");
        const posts = await Post.findById(req.body.id);
        res.send(posts);
    } else {
        const posts = await Post.find({ subgreddit: req.body.subgreddiit });
        const subg = await Subgreddit.findById(req.body.subgreddiit);
        let send_data = [];
        posts.forEach((post) => {
            send_data.push({
                _id: post._id,
                title: post.title,
                text: post.text,
                postedby: post.postedby,
                subgreddit: post.subgreddit,
                date: post.date,
                upvotes: post.upvotes,
                downvotes: post.downvotes,
                comments: post.comments,
            });
        });
        for (let i = 0; i < send_data.length; i++) {
            const user = await User.findById(send_data[i].postedby);
            if (subg.bannednormies.includes(user._id)) {
                send_data[i].postedby = "banned_user";
            } else {
                send_data[i].postedby = user.username;
            }
        }
        console.log("that");
        res.send(send_data);
    }
    res.status(400).send({ error: "Bad request" });
});

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({});
    res.send(posts);
});

const deleteAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.deleteMany({});
    const subgreddiits = await Subgreddit.find({});
    subgreddiits.forEach((subgreddiit) => {
        subgreddiit.posts = [];
        subgreddiit.save();
    });
    res.send(posts);
});

const deletePost = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(403).send({ error: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id != authData._id) {
            res.status(403).send({
                error: "You cannot delete posts for other users",
            });
            return;
        }
    }

    if (req.body) {
        const post = await Post.findById(req.body.id);
        if (post) {
            const deletedPost = await post.remove();
            res.send(deletedPost);
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } else {
        res.status(400).send({ error: "Bad request" });
    }
});

const updatePost = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(403).send({ error: "Invalid token" });
            return;
        }
    }

    if (authData) {
        if (req.params.id != authData._id) {
            res.status(403).send({
                error: "You cannot update posts for other users",
            });
            return;
        }
    }

    if (req.body) {
        const post = await Post.findById(req.body.id);
        if (post) {
            if (req.body.type == "upvote") {
                if (!post.upvotes.includes(req.params.id)) {
                    if (post.downvotes.includes(req.params.id)) {
                        post.downvotes = post.downvotes.filter(
                            (item) => item != req.params.id
                        );
                    }
                    post.upvotes.push(req.params.id);
                    const updatedPost = await post.save();
                    res.send(updatedPost);
                } else {
                    res.status(400).send({ error: "Bad request" });
                }
            } else if (req.body.type == "downvote") {
                if (!post.downvotes.includes(req.params.id)) {
                    if (post.upvotes.includes(req.params.id)) {
                        post.upvotes = post.upvotes.filter(
                            (item) => item != req.params.id
                        );
                    }
                    post.downvotes.push(req.params.id);
                    const updatedPost = await post.save();
                    res.send(updatedPost);
                } else {
                    res.status(400).send({ error: "Bad request" });
                }
            } else if (req.body.type == "unvote") {
                if (post.upvotes.includes(req.params.id)) {
                    post.upvotes = post.upvotes.filter(
                        (item) => item != req.params.id
                    );
                    const updatedPost = await post.save();
                    res.send(updatedPost);
                } else if (post.downvotes.includes(req.params.id)) {
                    post.downvotes = post.downvotes.filter(
                        (item) => item != req.params.id
                    );
                    const updatedPost = await post.save();
                    res.send(updatedPost);
                } else {
                    res.status(400).send({ error: "Bad request" });
                }
            } else if (req.body.type == "comment") {
                if (req.body.comment) {
                    post.comments.push(req.body.comment);
                    const updatedPost = await post.save();
                    res.send(updatedPost);
                } else {
                    res.status(400).send({ error: "Bad request" });
                }
            } else if (req.body.type == "deleteComment") {
                if (req.body.commentid) {
                    post.comments = post.comments.filter(
                        (item) => item._id != req.body.commentid
                    );
                    const updatedPost = await post.save();
                    res.send(updatedPost);
                }
            } else {
                res.status(400).send({ error: "Bad request" });
            }
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } else {
        res.status(400).send({ error: "Bad request" });
    }
});

const getSavedPosts = asyncHandler(async (req, res) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let authData;
    if (token) {
        try {
            authData = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(403).send({ error: "Invalid token" });
            return;
        }
    }

    console.log("hmm");

    if (authData) {
        if (req.params.id != authData._id) {
            res.status(403).send({
                error: "You cannot access other users saved posts",
            });
            return;
        }
    }

    let posts = [];
    let all_posts = await Post.find({});
    let user = await User.findById(req.params.id);
    let saved_posts = user.saved;

    saved_posts.forEach((post) => {
        all_posts.forEach((item) => {
            if (item._id == post) {
                posts.push(item);
            }
        });
    });

    for (let i = 0; i < posts.length; i++) {
        let postedby = await User.findById(posts[i].postedby);
        posts[i].postedby = postedby.username;
    }

    res.send(posts);
});

module.exports = {
    createPost,
    getAllPosts,
    deleteAllPosts,
    updatePost,
    getPosts,
    deletePost,
    getSavedPosts,
};
