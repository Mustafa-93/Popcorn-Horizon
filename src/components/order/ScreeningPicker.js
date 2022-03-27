import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { ReservationContext } from "../../contexts/ReservationContext";
import moment from "moment";
import "moment/locale/sv";
import styles from "./styles/ScreeningPicker.module.css";

const ScreeningPicker = () => {
  const history = useHistory();

  const {
    movieIdOnOrderPage,
    screeningIdOnOrderPage,
    setScreeningIdOnOrderPage,
    movieScreenings,
    screeningToShow,
  } = useContext(ReservationContext);

  const [selectedScreening, setSelectedScreening] = useState("");

  useEffect(() => {
    if (screeningIdOnOrderPage !== null) {
      setSelectedScreening(screeningIdOnOrderPage);
    }
  }, [screeningIdOnOrderPage]);

  const handleSelectChange = (e) => {
    if (e.target.value === "") {
      setScreeningIdOnOrderPage(null);
    }
    history.push(`/order/${movieIdOnOrderPage}/${e.target.value}`);
    setSelectedScreening(e.target.value);
  };

  return (
    <>
      <Row className="my-4 ">
        <Col sm={12} md={6}>
          {movieScreenings && <h4>{movieScreenings[0].movieId.title}</h4>}
        </Col>
        <Col className="text-md-right">
          <select
            className={styles.select}
            onChange={handleSelectChange}
            value={selectedScreening}
          >
            <option value="">Choose a time</option>
            {movieScreenings &&
              movieScreenings.map((screen) => (
                <option key={screen._id} value={screen._id}>
                  {moment(screen.startTime).locale("sv").format("lll")}
                </option>
              ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          {screeningToShow && <h4>{screeningToShow.auditoriumName}</h4>}
        </Col>
      </Row>
    </>
  );
};

export default ScreeningPicker;
