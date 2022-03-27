const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  actors: [String],
  ageLimit: String,
  description: String,
  director: String,
  genre: String,
  image: String,
  language: String,
  length: Number,
  productionCountries: [String],
  productionYear: Number,
  title: String,
  price: Number,
  youtubeTrailer: String,
});
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
