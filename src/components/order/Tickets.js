import { useContext, useEffect, useState } from "react";
import styles from "./styles/Tickets.module.css";
import { ReservationContext } from "../../contexts/ReservationContext";
import { Container, Row, Col, Modal } from "react-bootstrap";
import CustomButton from "../CustomButton";
import moment from "moment";
import "moment/locale/sv";
import ConfirmModal from "./ConfirmModal";
import { useHistory } from "react-router-dom";

const Tickets = () => {
  const [userConfirmationInfo, setUserConfirmationInfo] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    ticketsChosen,
    setTicketsChosen,
    screeningToShow,
    userConfirmsReservation,
    getTotalPrice,
  } = useContext(ReservationContext);

  const history = useHistory();

  useEffect(() => {}, [userConfirmationInfo]);

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    history.push("/");
  };

  const handleConfirmClick = async () => {
    let result = await userConfirmsReservation();
    if (!result) {
      return;
    } else {
      setUserConfirmationInfo(result);
      setShowConfirmModal(true);
    }
  };

  const handleSelectTicketType = (e, ticket) => {
    let newList = [...ticketsChosen];
    const findIndex = newList.indexOf(ticket);
    const newObject = {
      ticketType: e.target.value,
      seatNumber: ticket.seatNumber,
    };
    newList.splice(findIndex, 1, newObject);
    setTicketsChosen(newList);
  };
  const ticket =
    ticketsChosen &&
    ticketsChosen.map((ticket, index) => {
      return (
        <>
          <Container className={styles.ticket_container} fluid key={index}>
            <Row className={styles.ticket_container_upper} noGutters={true}>
              <Col>
                <p>
                  <span>{screeningToShow.movieId.title} </span>
                  <br />
                  <span>{moment(screeningToShow.startTime).format("lll")}</span>
                </p>
              </Col>
              <Col>
                <Row noGutters={true}>
                  <Col lg={6}>
                    <input
                      defaultChecked={true}
                      type="radio"
                      name={`ticket` + index}
                      value="adult"
                      onChange={(e) => handleSelectTicketType(e, ticket)}
                    />
                    <label className="pl-2">Adult</label>
                  </Col>
                  <Col lg={6}>
                    <input
                      type="radio"
                      name={`ticket` + index}
                      value="senior"
                      onChange={(e) => handleSelectTicketType(e, ticket)}
                    />
                    <label className="pl-2">Pensioner</label>
                  </Col>
                  <Col lg={6}>
                    <input
                      type="radio"
                      name={`ticket` + index}
                      value="child"
                      onChange={(e) => handleSelectTicketType(e, ticket)}
                    />
                    <label className="pl-2">Barn</label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={styles.ticket_container_lower} noGutters={true}>
              <Col>
                <ul className={styles.ul}>
                  <li>
                    Row: {ticket.seatNumber[0] + 1}, Place:{" "}
                    {ticket.seatNumber[1] + 1}
                  </li>
                </ul>
              </Col>
              <Col>
                Price:{" "}
                {ticket.ticketType === "adult"
                  ? screeningToShow.price
                  : ticket.ticketType === "senior"
                  ? screeningToShow.price * 0.8
                  : screeningToShow.price * 0.7}{" "}
                kr
              </Col>
            </Row>
          </Container>
        </>
      );
    });

  return (
    <>
      {screeningToShow && (
        <div className={`${styles.tickets_wrapper}`}>
          <div className={styles.ticket_wrapper_upper}>
            <h2 className={styles.title}>Selected tickets</h2>
            {ticket}
          </div>
          <div className={styles.ticket_wrapper_bottom}>
            <hr className={styles.hr} />
            {ticketsChosen.length > 0 && (
              <p className={styles.price}>
                Total Price:{" "}
                <span>
                  {getTotalPrice(ticketsChosen, screeningToShow.price)}
                </span>{" "}
                kr
              </p>
            )}

            {ticketsChosen.length > 0 && (
              <div className="d-flex justify-content-center mt-4">
                <CustomButton
                  text="Book Tickets"
                  clickHandler={handleConfirmClick}
                />
              </div>
            )}
          </div>
          <Modal
            centered={true}
            size={"lg"}
            show={showConfirmModal}
            onHide={handleCloseConfirmModal}
          >
            <ConfirmModal
              userConfirmationInfo={userConfirmationInfo}
              handleCloseConfirmModal={handleCloseConfirmModal}
            />
          </Modal>
        </div>
      )}
    </>
  );
};
export default Tickets;
