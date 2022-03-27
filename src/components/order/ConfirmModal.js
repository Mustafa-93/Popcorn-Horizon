import styles from "../../css/ConfirmModal.module.css";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import "moment/locale/sv";
import { checkTicketType } from "../../utilities/utilities";

const ConfirmModal = ({ handleCloseConfirmModal, userConfirmationInfo }) => {
  const reservation = (
    <Container fluid className={styles.reservation}>
      <Row className={styles.reservation_header_wrapper} noGutters={true}>
        <Col>
          <p className={styles.reservation_header_information}>
            {userConfirmationInfo.movie.title}
            <br />
            {moment(userConfirmationInfo.screening.startTime)
              .locale("sv")
              .format("LLL")}
          </p>
        </Col>
      </Row>
      <hr className={styles.hr} />

      <Row className={styles.auditoria_wrapper} noGutters={true}>
        <Col>
          <p className={styles.auditoria_information}>
            Salon: <br />
            <span className={styles.sub_information}>
              {userConfirmationInfo.screening.auditoriumName}
            </span>
          </p>
        </Col>
        <Col>
          <p className={styles.auditoria_seats_information}>
            Row and place number
          </p>
          <ul className={styles.ul}>
            {userConfirmationInfo.tickets.map((ticket, i) => (
              <li key={i}>
                Rad {ticket.seatNumber[0] + 1}, Plats {ticket.seatNumber[1] + 1}{" "}
                ({checkTicketType(ticket.ticketType)})
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <hr className={styles.hr} />

      <Row className={styles.summary_wrapper} noGutters={true}>
        <Col>
          <p className={styles.summary_information}>
            Number of tickets:{" "}
            <span className={styles.sub_information}>
              {userConfirmationInfo.tickets.length}st
            </span>
          </p>
          <p className={styles.summary_information}>
            Total Price:{" "}
            <span className={styles.sub_information}>
              {Number(userConfirmationInfo.totalPrice)} kr
            </span>
          </p>
        </Col>
        <Col>
          <p className={styles.order_information}>
            Order:{" "}
            <span className={styles.sub_information}>
              #{userConfirmationInfo._id.slice(0, 8)}
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className={styles.modal_container}>
      <h2 className={styles.header}>Tickets booked!</h2>
      {reservation}
      <div className={styles.button_confirm_wrapper}>
        <button
          onClick={handleCloseConfirmModal}
          className={`${styles.button_confirm} btn`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
