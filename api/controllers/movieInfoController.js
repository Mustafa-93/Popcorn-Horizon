const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const getMovieById = async (req, res) => {
  Movie.findById(req.params.movieId).exec(async (err, movie) => {
    if (err) {
      throw new Error("error message: ", err);
    }
    return res.json(movie);
  });
};
const getFilteredMovies = async (req, res) => {
  const userQuery = req.query;
  if (Object.keys(userQuery).length === 0) {
    try {
      let movies = await Movie.find().exec();
      return res.json(movies);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
      throw error;
    }
  } else {
    try {
      const minLength = parseInt(userQuery.minLength) || 0;
      const maxLength = parseInt(userQuery.maxLength) || 236;
      const actorsQuery = new RegExp(`\\w*${userQuery.actors ?? ""}\\w*`, "gi");
      const directorsQuery = new RegExp(
        `\\w*${userQuery.director ?? ""}\\w*`,
        "gi"
      );
      const textSearchQuery = new RegExp(
        `\\w*${userQuery.textSearch ?? ""}\\w*`,
        "gi"
      );
      let screeningResults = [];
      if (userQuery.startTime) {
        const minStartTime = new Date(userQuery.startTime + " 00:00");
        const maxStartTime = new Date(userQuery.startTime + " 23:00");
        screeningResults = await Screening.find(
          {
            startTime: { $gte: minStartTime, $lte: maxStartTime },
          },
          { movieId: 1 }
        ).exec();
  
        if (screeningResults.length === 0) {
          return res.json(screeningResults);
        }
        screeningResults = screeningResults.map((value) => value.movieId);
      }
      let result = await Movie.find({
        $and: [
          { length: { $gte: minLength, $lte: maxLength } },
          { actors: actorsQuery },
          { director: directorsQuery },
          userQuery.genre ? { genre: userQuery.genre } : {},
          userQuery.price ? { price: parseInt(userQuery.price) } : {},
          userQuery.ageLimit ? { ageLimit: userQuery.ageLimit } : {},
          userQuery.language ? { language: userQuery.language } : {},
          screeningResults.length === 0
            ? {}
            : {
                $or: [
                  {
                    _id: screeningResults,
                  },
                ],
              },
          {
            $or: [
              { title: textSearchQuery },
              { description: textSearchQuery },
              { director: textSearchQuery },
              { actors: textSearchQuery },
              { genre: textSearchQuery },
            ],
          },
        ],
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
      throw error;
    }
  }
};
module.exports = {
  getMovieById,
  getFilteredMovies,
};
