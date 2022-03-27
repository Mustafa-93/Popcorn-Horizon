import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReservationContext } from "../contexts/ReservationContext";
import { Row, Col } from "react-bootstrap";
import Auditorium from "../components/order/Auditorium";
import ScreeningPicker from "../components/order/ScreeningPicker";
import styles from "../css/OrderPage.module.css";
import Tickets from "../components/order/Tickets";

export default function OrderPage() {
  const { setMovieIdOnOrderPage, setScreeningIdOnOrderPage } =
    useContext(ReservationContext);
  const { movieId, screeningId } = useParams();

  useEffect(() => setScreeningIdOnOrderPage(screeningId), [screeningId]);
  useEffect(() => setMovieIdOnOrderPage(movieId), [movieId]);

  useEffect(() => {
    return () => {
      setScreeningIdOnOrderPage(null);
      setMovieIdOnOrderPage(null);
    };
  }, []);

  return (
    <div className="mx-3 py-5">
      <Row>
        <Col lg={6}>
          <h2 className={styles.pageHeader}>Booked Tickets</h2>
          <ScreeningPicker />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Auditorium />
        </Col>
        <Col lg={6}>
          <Tickets />
        </Col>
      </Row>
    </div>
  );
}
