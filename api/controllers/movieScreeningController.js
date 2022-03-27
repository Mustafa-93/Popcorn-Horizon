const Screening = require("../models/Screening");
const getScreenings = async (req, res) => {
  try {
    if (req.query.date) {
      const date = req.query.date;
      const minStartTime = new Date(date + " 00:00");
      const maxStartTime = new Date(date + " 23:00");
      let screenings = await Screening.find({
        startTime: { $gte: minStartTime && new Date(), $lte: maxStartTime },
      })
        .populate("movieId")
        .exec();
      return res.json(screenings);
    }
    if (req.query.movieId) {
      const movieId = req.query;
      let screenings = await Screening.find(movieId);
      return res.json(screenings);
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports = {
  getScreenings,
};
