const port = 3001;
const uri =
  // "mongodb+srv://demouser:demouser123@cluster0.ilmre.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  "mongodb+srv://Mustafa:N+.WGa7xnu@cluster0.fbjbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// Server setup
const express = require("express");
const session = require("express-session");
const app = express();

// Mongoose
const mongoose = require("mongoose");
const db = mongoose.connection;

// Import routes
const movieRoutes = require("./routes/movieRoutes");
const screeningRoutes = require("./routes/screeningRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware that parses JSON
app.use(express.json());

// Express session
app.use(
  session({
    secret: "team immobile",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

// Middlewares
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/screenings", screeningRoutes);
app.use("/api/v1/reservations", reservationRoutes);
app.use("/api/v1/users", userRoutes);

// Server
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening to port: ${port}`);
});

// DB connection
mongoose.connect(uri, {
 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Connected to MongoDB!`);
});
