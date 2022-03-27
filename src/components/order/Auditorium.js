import { useContext, useState, useEffect } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import Chair from "./Chair";
import styles from "./styles/Auditorium.module.css";

const Auditorium = () => {
  const { screeningToShow } = useContext(ReservationContext);
  const [auditorium, setAuditorium] = useState(null);

  const renderCinemaMatrix = () => {
    const cinemaMatrix = [];
    if (screeningToShow) {
      const seats = screeningToShow.seats;

      for (let row = 0; row < seats.length; row++) {
        cinemaMatrix.push(<br key={row}></br>);
        for (let seat = 0; seat < seats[row].length; seat++) {
          if (seats[row][seat] === 1) {
            cinemaMatrix.push(
              <Chair
                row={row}
                seat={seat}
                key={screeningToShow._id + row + seat}
                reserved={true}
              />
            );
          } else {
            cinemaMatrix.push(
              <Chair
                reserved={false}
                row={row}
                seat={seat}
                chairsInRow={seats[row].length}
                key={screeningToShow._id + row + seat}
              />
            );
          }
        }
      }
      return <div className={styles.chairsWrapper}>{cinemaMatrix}</div>;
    } else {
      return <h2>...loading</h2>;
    }
  };

  useEffect(() => setAuditorium(renderCinemaMatrix()), [screeningToShow]);

  return (
    <>
      {screeningToShow && (
        <div className={`${styles.wrapper}`}>
          <span className={styles.screen}></span>
          {auditorium}
          <div className={styles.details}>
            <Chair detailsSelectedChair={true} />
            <Chair deailsOrderedChair={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Auditorium;
