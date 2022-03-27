import styles from "../../css/UserReservation.module.css";
import { useState } from "react";
import { Accordion, Row, Col, Modal } from "react-bootstrap";
import moment from "moment";
import "moment/locale/sv";
import CancelBookingModal from "./CancelBookingModal";
import { checkTicketType } from "../../utilities/utilities";

const UserReservation = ({ reservation }) => {
  const [toggleAccordion, setToggleAccordion] = useState(false);
  const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
  const now = moment(new Date()).format();
  const icon = !toggleAccordion ? (
    <i className={`${styles.icon} fas fa-arrow-down`} />
  ) : (
    <i className={`${styles.icon} fas fa-arrow-up`} />
  );

  return (
    <Accordion
      style={{
        backgroundColor:
          reservation?.screening?.startTime <= now ? "#C4C4C4" : "#fff",
      }}
      className={styles.reservation}
    >
      <Row className={styles.header_wrapper} noGutters={true}>
        <Col xs={10} sm={10} md={10} lg={10}>
          <p className={styles.header_information}>
            {reservation?.movie?.title} <br />
            {moment(reservation?.screening?.startTime)
              .locale("sv")
              .format("LLL")}
          </p>
        </Col>
        <Col
          xs={2}
          sm={2}
          md={2}
          lg={2}
          className="d-flex justify-content-end align-items-center"
        >
          <div className={styles.icon_wrapper}>
            <Accordion.Toggle
              onClick={() => setToggleAccordion(!toggleAccordion)}
              eventKey="0"
              as={"span"}
            >
              {icon}
            </Accordion.Toggle>
          </div>
        </Col>
      </Row>
      <Accordion.Collapse eventKey="0">
        <div>
          <hr className={styles.hr} />
          <Row className={styles.auditoria_wrapper} noGutters={true}>
            <Col>
              <p className={styles.auditoria_information}>
                Salon: <br />
                <span className={styles.sub_information}>
                  {reservation?.screening?.auditoriumName}
                </span>
              </p>
            </Col>
            <Col>
              <p className={styles.auditoria_seats_information}>
                Row and place number
              </p>
              <ul className={styles.ul}>
                {reservation?.tickets.map((ticket, i) => (
                  <li key={i}>
                    Row {ticket.seatNumber[0] + 1}, Place{" "}
                    {ticket.seatNumber[1] + 1} (
                    {checkTicketType(ticket.ticketType)})
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
                  {reservation?.tickets.length} st
                </span>
              </p>
              <p className={styles.summary_information}>
                Total Price:{" "}
                <span className={styles.sub_information}>
                  {reservation?.totalPrice} kr
                </span>
              </p>
            </Col>
            <Col>
              <p className={styles.order_information}>
                Order:{" "}
                <span className={styles.sub_information}>
                  #{reservation?._id.slice(0, 8)}
                </span>
              </p>
            </Col>
          </Row>
          <Row noGutters={true}>
            <Col className={styles.button_wrapper}>
              {now <= reservation?.screening?.startTime && (
                <button
                  onClick={() => setShowCancelBookingModal(true)}
                  className="cancelButton"
                >
                  Cancel
                </button>
              )}
            </Col>
          </Row>
        </div>
      </Accordion.Collapse>
      <Modal size={"md"} centered={"true"} show={showCancelBookingModal}>
        <CancelBookingModal
          reservation={reservation}
          setShowCancelBookingModal={setShowCancelBookingModal}
        />
      </Modal>
    </Accordion>
  );
};

export default UserReservation;
