import styles from "../../css/ReservationList.module.css";
import UserReservation from "./UserReservation";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const ReservationList = () => {
  const { userReservations } = useContext(UserContext);
  const reservation = userReservations?.map((reservation, index) => {
    return (
      <UserReservation
        key={index + reservation._id}
        reservation={reservation}
      />
    );
  });
  return (
    <div className={styles.listing_wrapper}>
      <h2 className={styles.title}>Booked Tickets</h2>
      {reservation}
    </div>
  );
};

export default ReservationList;
