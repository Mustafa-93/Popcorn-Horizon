const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const screeningSchema = new Schema({
  auditoriumName: String,
  startTime: Date,
  seats: [[Number]],
  price: Number,
  movieId: { type: Schema.Types.ObjectId, ref: "Movie" },
});
const Screening = mongoose.model("Screening", screeningSchema);
module.exports = Screening;
