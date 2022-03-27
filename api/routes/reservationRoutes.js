const express = require("express");
const router = express.Router();
const reservationInfoController = require("../controllers/reservationInfoController");
router.post("/", reservationInfoController.createNewReservation);
router.get("/user", reservationInfoController.getReservationsForUser);
router.delete("/:reservationId", reservationInfoController.cancelReservation);
module.exports = router;
