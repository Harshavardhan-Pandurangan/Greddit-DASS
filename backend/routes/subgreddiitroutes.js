const express = require("express");
const router = express.Router();

const {
    createSubgreddit,
    getSubgreddiits,
    deleteAllSubgreddiits,
    updateSubgreddiits,
    getSubgreddit,
    deleteSubgreddit,
} = require("../controls/subgreddiitcontrols");

router.post("/create/:id", createSubgreddit);
router.put("/update/:id", updateSubgreddiits);
router.post("/get/:id", getSubgreddit);
router.post("/delete/:id", deleteSubgreddit);
// to be commented out when deployed
router.get("/getall", getSubgreddiits);
router.delete("/deleteall", deleteAllSubgreddiits);

module.exports = router;
