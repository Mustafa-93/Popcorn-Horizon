const express = require("express");
const router = express.Router();
const movieScreeningController = require("../controllers/movieScreeningController");
router.get("/", movieScreeningController.getScreenings);
module.exports = router;
