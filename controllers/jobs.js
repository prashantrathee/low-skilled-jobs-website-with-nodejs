const express = require("express");
const router = express.Router();
const postJob = require("./postJob");
const searchJobs = require("./searchJobs");
const providedJobs = require("./providedJobs");
router.post("/postJob",postJob);

router.post("/searchJobs",searchJobs);

router.post("/providedJobs",providedJobs);

module.exports = router;