import styles from "../../css/ProfileInformation.module.css";
import ProfileForm from "./ProfileForm";

const ProfileInformation = () => {
  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.header_wrapper}>
        <h2>Profilinformation</h2>
      </div>
      <hr className={styles.hr} />
      <ProfileForm />
    </div>
  );
};

export default ProfileInformation;
