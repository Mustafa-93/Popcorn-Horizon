const express = require("express");
const router = express.Router();
const movieInfoController = require("../controllers/movieInfoController");
router.get("/", movieInfoController.getFilteredMovies);
router.get("/:movieId", movieInfoController.getMovieById);
module.exports = router;
