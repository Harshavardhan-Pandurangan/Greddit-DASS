const Report = require("../models/reports");
const Subgreddit = require("../models/subgreddiits");
const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const days = 10;

const createReport = asyncHandler(async (req, res) => {
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
                error: "You cannot create reports for other users",
            });
            return;
        }
    }

    if (req.body) {
        const post = await Post.findById(req.body.postid);
        const subgreddit = await Subgreddit.findById(post.subgreddit);
        if (!subgreddit) {
            res.status(404).send({
                error: "Subgreddit not found",
            });
            return;
        }

        // if (
        //     !subgreddit.normies.includes(req.params.id) ||
        //     subgreddit.moderator != req.params.id
        // ) {
        //     console.log("really");
        //     console.log(req.params.id);
        //     console.log(subgreddit.normies);
        //     res.status(403).send({
        //         error: "You cannot report posts from subgreddiits you are not a member of",
        //         subgreddit: subgreddit,
        //     });
        //     return;
        // }

        const report = await Report.create({
            context: req.body.text,
            reportedby: req.params.id,
            postid: req.body.postid,
        });
        if (report) {
            res.status(201).send({
                creation_status: "success",
            });
        }

        if (!report) {
            res.status(400).send({
                creation_status: "failure",
                error: "Invalid report data",
            });
        }
    }
});

const getReports = asyncHandler(async (req, res) => {
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
                error: "You cannot view reports for other users",
            });
            return;
        }
    }

    let reports = await Report.find({});
    for (let i = 0; i < reports.length; i++) {
        const post = await Post.findById(reports[i].postid);
        if (post) {
            console.log(post);
            reports[i].post = post;
        } else {
            console.log("post not found");
            Report.findByIdAndDelete(reports[i]._id);
            reports[i].post = null;
        }
    }

    reports = reports.filter((report) => report.post != null);

    for (let i = 0; i < reports.length; i++) {
        if (Date.now() - reports[i].date > days * 24 * 60 * 60 * 1000) {
            reports[i].status = "expired";
            await reports[i].save();
        }
    }

    for (let i = 0; i < reports.length; i++) {
        const subgreddiit = await Subgreddit.findById(
            reports[i].post.subgreddit
        );
        if (subgreddiit) {
            reports[i].subgreddit = subgreddiit;
        } else {
            reports[i].subgreddit = null;
        }
    }

    for (let i = 0; i < reports.length; i++) {
        if (reports[i].subgreddit == null) {
            Report.findByIdAndDelete(reports[i]._id);
        }
    }

    reports = reports.filter((report) => report.subgreddit != null);

    for (let i = 0; i < reports.length; i++) {
        if (reports[i].subgreddit.moderator != req.params.id) {
            reports.filter((report) => report._id != reports[i]._id);
        }
    }

    if (reports) {
        // console.log(reports);
        res.status(200).send(reports);
    }

    if (!reports) {
        res.status(404).send({
            error: "No reports found",
        });
    }
});

const getReport = asyncHandler(async (req, res) => {
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
                error: "You cannot view reports for other users",
            });
            return;
        }
    }

    const report = await Report.findById(req.params.id);
    if (report) {
        res.status(200).send(report);
    }

    if (!report) {
        res.status(404).send({
            error: "No report found",
        });
    }
});

const updateReport = asyncHandler(async (req, res) => {
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
                error: "You cannot update reports for other users",
            });
            return;
        }
    }

    const report = await Report.findById(req.body.id);
    if (report) {
        report.status = req.body.status;
        const updatedReport = await report.save();
        res.status(200).send(updatedReport);
    }

    if (!report) {
        res.status(404).send({
            error: "No report found",
        });
    }
});

const deleteReport = asyncHandler(async (req, res) => {
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
                error: "You cannot delete reports for other users",
            });
            return;
        }
    }

    const report = await Report.findById(req.body.id);
    if (report) {
        await report.remove();
        res.status(200).send({
            deletion_status: "success",
        });
    }

    if (!report) {
        res.status(404).send({
            deletion_status: "failure",
            error: "No report found",
        });
    }
});

const deleteAllReports = asyncHandler(async (req, res) => {
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
                error: "You cannot delete reports for other users",
            });
            return;
        }
    }

    const reports = await Report.find({ subgreddiit: req.body.id });
    if (reports) {
        await Report.deleteMany({ subgreddiit: req.body.id });
        res.status(200).send({
            deletion_status: "success",
        });
    }

    if (!reports) {
        res.status(404).send({
            deletion_status: "failure",
            error: "No reports found",
        });
    }
});

const deleteAllReportsForce = asyncHandler(async (req, res) => {
    await Report.deleteMany({});
    res.status(200).send({
        deletion_status: "success",
    });
});

module.exports = {
    createReport,
    getReports,
    getReport,
    updateReport,
    deleteReport,
    deleteAllReports,
    deleteAllReportsForce,
};
