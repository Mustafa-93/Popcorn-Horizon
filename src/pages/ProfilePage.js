import styles from "../css/ProfilePage.module.css";
import ProfileInformation from "../components/profile/ProfileInformation";
import ReservationList from "../components/profile/ReservationList";
import { Container } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <Container className={`${styles.profile_container}`} fluid>
      <div id={styles.profile_information_wrapper}>
        <ProfileInformation />
      </div>
      <div id={styles.profile_reservation_wrapper}>
        <ReservationList />
      </div>
    </Container>
  );
};

export default ProfilePage;
