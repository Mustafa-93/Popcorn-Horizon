const fs = require("fs");
const mongoose = require("mongoose");
// const Movie = require("../../models/Movie");
// const Auditorium = require("./models/Auditorium");
// const Screening = require("../../models/Screening");
const Auditorium = require("../../models/Auditorium");
const db = mongoose.connection;

const uri =
"mongodb+srv://Mustafa:N+.WGa7xnu@cluster0.fbjbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// const movieData = require("./movieDATA.json");
const auditoriumData = require("./auditoria.json");
// const screeningData = require("./screenings.json");
let movies = [];

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected.");
    // insertScreeningDataFunc();
    // insertMovieDataFunc();
    insertAuditoriumDataFunc();
  })
  .catch((err) => console.log("Error in db connection:", err));

// async function insertScreeningDataFunc() {
//   console.log("Data is being inserted...");
//   await Screening.create(screeningData);
//   console.log("Insertion completed");
//   mongoose.connection.close();
//   console.log("Shutting down...");
// }

async function insertAuditoriumDataFunc() {
  console.log("Data is being inserted...");
  await Auditorium.create(auditoriumData);
  console.log("Insertion completed");
  mongoose.connection.close();
  console.log("Shutting down...");
}

// async function insertMovieDataFunc() {
//   console.log("Data is being inserted...");
//   await Movie.create(movieData);
//   console.log("Insertion completed");
//   let dbMovies = await Movie.find().exec();
//   movies = dbMovies.map((movie) => ({
//     movieId: movie._id,
//     price: movie.price,
//   }));
//   let data = JSON.stringify(movies);
//   fs.writeFileSync("movieInfoFromDB.json", data);
//   mongoose.connection.close();
//   console.log("Shutting down...");
// }

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB.22.2");
});
