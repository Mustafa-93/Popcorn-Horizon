const Reservation = require("../models/Reservation");
const Movie = require("../models/Movie");
const Screening = require("../models/Screening");
const getReservationsForUser = async (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ status: "error", message: "No user logged in" });
  }
  try {
    let reservations = await Reservation.find({
      userId: req.session.user._id,
    }).sort({ "screening.startTime": "desc" });
    return res.json(reservations);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
const createNewReservation = async (req, res) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ status: "error", message: "No user logged in" });
  }
  try {
    let screening = await Screening.findById(req.body.screeningId);
    let movie = await Movie.findById(screening.movieId).exec();
    for (let i = 0; i < req.body.tickets.length; i++) {
      if (
        screening.seats[req.body.tickets[i].seatNumber[0]][
          req.body.tickets[i].seatNumber[1]
        ] === 1
      ) {
        return res
          .status(400)
          .json({ status: "error", message: "Seat already reserved." });
      } else {
        screening.seats[req.body.tickets[i].seatNumber[0]][
          req.body.tickets[i].seatNumber[1]
        ] = 1;
      }
    }
    screening.markModified("seats");
    await screening.save();
    let reservation = await Reservation.create({
      movie: {
        movieId: movie._id,
        title: movie.title,
        image: movie.image,
        length: movie.length,
        genre: movie.genre,
      },
      screening: {
        screeningId: screening._id,
        startTime: screening.startTime,
        auditoriumName: screening.auditoriumName,
      },
      tickets: req.body.tickets,
      totalPrice: req.body.totalPrice,
      userId: req.session.user._id,
    });
    return res.json({ status: "success", reservation: reservation });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
const cancelReservation = async (req, res) => {
  const { reservationId } = req.params;
  if (!req.session.user) {
    return res
      .status(401)
      .json({ status: "error", message: "No user logged in" });
  }
  try {
    let reservationToCancel = await Reservation.findById(reservationId);
    if (req.session.user._id !== String(reservationToCancel.userId)) {
      return res
        .status(401)
        .json({ status: "error", message: "Reservation made by other user" });
    }
    let screening = await Screening.findById(
      reservationToCancel.screening.screeningId
    );
    reservationToCancel.tickets.forEach((ticket, i) => {
      screening.seats[ticket.seatNumber[0]][ticket.seatNumber[1]] = 0;
    });
    screening.markModified("seats");
    await screening.save();
    reservationToCancel.deleteOne((err, result) => {
      if (err) {
        res.status(500).json({ status: "error", message: err.message });
      } else {
        res.status(200).json({
          status: "success",
          message: `Reservation with ordernr ${reservationId} is now cancelled`,
          cancelledReservation: result,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports = {
  getReservationsForUser,
  createNewReservation,
  cancelReservation,
};
