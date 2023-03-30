const express = require("express");
const router = express.Router();

const {
    createReport,
    getReports,
    getReport,
    updateReport,
    deleteReport,
    deleteAllReports,
    deleteAllReportsForce,
} = require("../controls/reportcontrols");

router.post("/create/:id", createReport);
router.get("/getreports/:id", getReports);
router.get("/getreport/:id", getReport);
router.put("/update/:id", updateReport);
router.delete("/delete/:id", deleteReport);
router.delete("/deleteall/:id", deleteAllReports);
// to be commented out when deployed
router.delete("/deleteallforce", deleteAllReportsForce);

module.exports = router;
