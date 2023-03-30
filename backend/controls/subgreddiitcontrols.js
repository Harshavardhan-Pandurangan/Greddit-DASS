const Subgreddit = require("../models/subgreddiits");
const Post = require("../models/posts");
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createSubgreddit = asyncHandler(async (req, res) => {
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
                error: "You cannot create subgreddits for other users",
            });
            return;
        }
    }

    if (req.body) {
        const subgredditExists = await Subgreddit.findOne({
            name: req.body.name,
        });
        if (subgredditExists) {
            res.status(400).send({ error: "Subgreddit already exists" });
            return;
        }

        const subgreddit = await Subgreddit.create({
            name: req.body.name,
            description: req.body.description,
            tags: req.body.tags,
            banned: req.body.banned,
            createdon: req.body.createdon,
            moderator: req.params.id,
        });

        if (subgreddit) {
            res.status(201).send({
                creation_status: "success",
            });
        } else {
            res.status(400).send({
                creation_status: "failure",
                error: "Invalid subgreddit data",
            });
        }
    }
});

const updateSubgreddiits = asyncHandler(async (req, res) => {
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
                error: "You cannot update subgreddits for other users",
            });
            return;
        }
    }

    if (req.body) {
        const subgreddiit = await Subgreddit.findById(req.body.id);
        if (subgreddiit) {
            if (req.body.type == "normie") {
                // Add a normie to the subgreddit, accept the request
                if (req.params.id != subgreddiit.moderator) {
                    res.status(403).send({
                        error: "You are not the moderator of this subgreddit",
                    });
                    return;
                }
                let id = await User.findOne({ username: req.body.normie });
                if (subgreddiit.normierequests.includes(id._id)) {
                    subgreddiit.normies.push(id._id);
                    subgreddiit.normierequests =
                        subgreddiit.normierequests.filter(
                            (normie) => normie != id._id
                        );
                } else {
                    res.status(404).send({ message: "User has no request." });
                    return;
                }
            } else if (req.body.type == "banned") {
                // Ban a normie from the subgreddit, remove the normie
                if (req.params.id != subgreddiit.moderator) {
                    res.status(403).send({
                        error: "You are not the moderator of this subgreddit",
                    });
                    return;
                }
                console.log(req.body.bannednormie);
                if (subgreddiit.normies.includes(req.body.bannednormie)) {
                    subgreddiit.bannednormies.push(req.body.bannednormie);
                    subgreddiit.normies = subgreddiit.normies.filter(
                        (normie) => normie != req.body.bannednormie
                    );
                } else {
                    res.status(404).send({ message: "User not a normie." });
                    return;
                }
            } else if (req.body.type == "request") {
                // Request to be a normie
                if (
                    subgreddiit.normierequests.includes(
                        req.body.normierequest
                    ) ||
                    subgreddiit.normies.includes(req.body.normierequest) ||
                    subgreddiit.bannednormies.includes(req.body.normierequest)
                ) {
                    res.send({
                        message:
                            "User already has a request, is a normie or banned.",
                    });
                    return;
                } else {
                    subgreddiit.normierequests =
                        subgreddiit.normierequests.filter(
                            (normie) => normie != req.body.normierequest
                        );
                    subgreddiit.normierequests.push(req.body.normierequest);
                }
            } else if (req.body.type == "removenormie") {
                // Remove a normie from the subgreddit
                if (subgreddiit.normies.includes(req.body.normie)) {
                    subgreddiit.normies = subgreddiit.normies.filter(
                        (normie) => normie != req.body.normie
                    );
                    subgreddiit.leftnormies.push(req.body.normie);
                } else {
                    res.status(404).send({ message: "User not a normie." });
                    return;
                }
            } else if (req.body.type == "removebanned") {
                // Remove a banned normie from the subgreddit
                if (req.params.id != subgreddiit.moderator) {
                    res.status(403).send({
                        error: "You are not the moderator of this subgreddit",
                    });
                    return;
                }
                if (subgreddiit.bannednormies.includes(req.body.bannednormie)) {
                    subgreddiit.bannednormies =
                        subgreddiit.bannednormies.filter(
                            (normie) => normie != req.body.bannednormie
                        );
                } else {
                    res.status(404).send({
                        message: "User not a banned normie.",
                    });
                    return;
                }
            } else if (req.body.type == "removerequest") {
                // Remove a normie request from the subgreddit
                if (req.params.id != subgreddiit.moderator) {
                    res.status(403).send({
                        error: "You are not the moderator of this subgreddit",
                    });
                    return;
                }
                let id = await User.findOne({ username: req.body.normie });
                if (subgreddiit.normierequests.includes(id._id)) {
                    subgreddiit.normierequests =
                        subgreddiit.normierequests.filter(
                            (normie) => normie != id._id
                        );
                } else {
                    res.status(404).send({
                        message: "User not a normie request.",
                    });
                    return;
                }
            } else {
                res.status(404).send({ message: "Invalid type." });
                return;
            }

            const updatedSubgreddit = await subgreddiit.save();
            res.send({
                message: "Subgreddit updated",
                subgreddiit: updatedSubgreddit,
            });
        } else {
            res.status(404).send({ message: "Subgreddit not found" });
        }
    }
});

const getSubgreddiits = asyncHandler(async (req, res) => {
    const subgreddiits = await Subgreddit.find({});
    res.send(subgreddiits);
});

const deleteAllSubgreddiits = asyncHandler(async (req, res) => {
    await Subgreddit.deleteMany({});
    await Post.deleteMany({});
    res.send({ message: "All subgreddiits deleted" });
});

const getSubgreddit = asyncHandler(async (req, res) => {
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
                error: "You cannot view subgreddits of other moderators",
            });
            return;
        }
    }

    const subgreddit = await Subgreddit.findById(req.body.id);
    if (subgreddit) {
        res.send(subgreddit);
    } else {
        res.status(404).send({ message: "Subgreddit not found" });
    }
});

const deleteSubgreddit = asyncHandler(async (req, res) => {
    console.log(req.headers);
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    console.log("trying");

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
                error: "You cannot delete subgreddits for other moderators",
            });
            return;
        }
    }

    const subgreddit = await Subgreddit.findById(req.body.id);
    if (subgreddit) {
        await Subgreddit.deleteOne({ _id: req.body.id });
        await Post.deleteMany({ subgreddit: req.body.id });
        res.send({ message: "Subgreddit deleted" });
    } else {
        res.status(404).send({ message: "Subgreddit not found" });
    }
});

module.exports = {
    createSubgreddit,
    getSubgreddiits,
    deleteAllSubgreddiits,
    updateSubgreddiits,
    getSubgreddit,
    deleteSubgreddit,
};
