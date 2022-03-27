import styles from "../../css/CancelBookingModal.module.css";
import { useContext } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import { Modal } from "react-bootstrap";
import moment from "moment";
import "moment/locale/sv";

const CancelBookingModal = ({ reservation, setShowCancelBookingModal }) => {
  const { userCancelsReservation } = useContext(ReservationContext);

  const handleConfirmCancellation = () => {
    userCancelsReservation(reservation?._id).then((data) => {
      if (data === true) {
        setShowCancelBookingModal(false);
      }
    });
  };

  return (
    <div className={`${styles.cancel_reservation_modal} rounded`}>
      <h2 className={styles.modal_header}>
      Do you want to cancel the following reservation?
      </h2>
      <Modal.Body>
        <p className={styles.content_text}>
          Order:{" "}
          <span className={styles.sub_information}>
            #{reservation?._id.slice(0, 8)}
          </span>{" "}
          <br />
          {reservation?.movie?.title} <br />
          {moment(reservation?.screening?.startTime).locale("sv").format("LLL")}
        </p>
      </Modal.Body>
      <Modal.Footer className={styles.modal_footer}>
        <button
          onClick={() => setShowCancelBookingModal(false)}
          className={`${styles.cancel_button} btn`}
        >
          Avbryt
        </button>
        <button
          onClick={() => handleConfirmCancellation()}
          className={`${styles.confirm_button} btn`}
        >
          Avboka
        </button>
      </Modal.Footer>
    </div>
  );
};

export default CancelBookingModal;
