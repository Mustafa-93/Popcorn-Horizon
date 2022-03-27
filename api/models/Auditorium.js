const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const auditoriumSchema = new Schema({
  name: String,
  seatsPerRow: [{ type: Number }],
  seatsTotal: Number,
});
const Auditorium = mongoose.model("Auditorium", auditoriumSchema);
module.exports = Auditorium;
