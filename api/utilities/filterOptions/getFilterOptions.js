const mongoose = require("mongoose");
const fs = require("fs");
const Movie = require("../../models/Movie");
const Screening = require("../../models/Screening");
const uri =
"mongodb+srv://Mustafa:N+.WGa7xnu@cluster0.fbjbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let allMovies;
let allScreenings;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected.");
    getAllMoviesAndScreenings();
  })
  .catch((err) => console.log("Error in db connection:", err));
async function getAllMoviesAndScreenings() {
  console.log("Data is being collected...");
  let moviesResult = await Movie.find().exec();
  allMovies = moviesResult;
  let screeningsResult = await Screening.find().exec();
  allScreenings = screeningsResult;
  mongoose.connection.close();
  console.log("Shutting down...");
  const priceOptions = new Set();
  const movieLengths = new Set();
  const movieGenres = new Set();
  const movieLanguages = new Set();
  const movieAgeLimits = new Set();
  allScreenings.forEach((screening) => {
    priceOptions.add(screening.price);
  });
  allMovies.forEach((movie) => {
    console.log("in foreach", movie);
    movieAgeLimits.add(movie.ageLimit);
    movieGenres.add(movie.genre);
    movieLanguages.add(movie.language);
    movieLengths.add(movie.length);
  });
  const filterOptions = {
    priceOptions: Array.from(priceOptions),
    movieAgeLimits: Array.from(movieAgeLimits),
    movieGenres: Array.from(movieGenres),
    movieLanguages: Array.from(movieLanguages),
    movieLengths: Array.from(movieLengths),
  };
  console.log(filterOptions);
  let data = JSON.stringify(filterOptions);
  fs.writeFileSync(
    "../../../src/utilities/filterOptions/filterOptions.json",
    data
  );
}
