import React from "react";
import { Row, Col } from "react-bootstrap";
import BookButton from "../components/BookButton";
import styles from "../css/MovieSchedule.module.css";

export default function MovieSchedule({
  isHomePage,
  date,
  time,
  totalPlaces,
  reservedPlaces,
  auditorium,
  title,
  movieId,
  screeningId,
}) {
  return (
    <>
      <Row className={`${styles.scheduleItem} d-flex align-items-center`}>
        {!isHomePage && (
          <Col xs={4} sm={3} className={`${styles.detailWrapper}`}>
            {date && (
              <div className={styles.scheduleDetails}>
                <p>{date}</p>
              </div>
            )}
          </Col>
        )}
        <Col xs={2} sm={2} className="text-left">
          <div
            className={
              isHomePage ? `${styles.scheduleDetails}` : styles.scheduleDetails
            }
          >
            <p>{time}</p>
          </div>
        </Col>
        <Col className={isHomePage ? "text-left" : "text-center"}>
          {totalPlaces ? (
            <div className={styles.scheduleDetails}>
              <p>
                <span>{totalPlaces - reservedPlaces}</span>
              </p>
            </div>
          ) : (
            <div
              className={
                isHomePage
                  ? `${styles.scheduleDetails}`
                  : styles.scheduleDetails
              }
            >
              <p>{title}</p>
            </div>
          )}
        </Col>
        <Col xs={0} sm={3} className="text-right d-none d-sm-block">
          <div
            className={
              isHomePage ? ` ${styles.scheduleDetails}` : styles.scheduleDetails
            }
          >
            <p>{auditorium}</p>
          </div>
        </Col>
        <Col
          xs={12}
          sm={2}
          className={`d-flex justify-content-end align-items-center ${styles.scheduleButtonWrapper}`}
        >
          <BookButton movieId={movieId} screeningId={screeningId} />
        </Col>
      </Row>
    </>
  );
}
