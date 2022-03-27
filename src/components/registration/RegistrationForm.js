import styles from "../../css/RegistrationForm.module.css";
import { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { checkPassword } from "../../utilities/utilities";
import RegistrationAlertBoxes from "./RegistrationAlertBoxes";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertPassword, setAlertPassword] = useState(false);
  const [alertConfirmPassword, setAlertConfirmPassword] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const { register, setShowLogin } = useContext(UserContext);
  const history = useHistory();
  const alerts = {
    alertPassword,
    alertConfirmPassword,
    alertEmail,
    setAlertPassword,
    setAlertConfirmPassword,
    setAlertEmail,
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (checkPassword(password) && confirmPassword.includes(password)) {
      register({ firstName, lastName, phone, email, password }).then((data) => {
        if (data === true) {
          setFirstName("");
          setLastName("");
          setPhone("");
          setEmail("");
          setPassword("");
          setAlertPassword(false);
          setAlertConfirmPassword(false);
          setAlertEmail(false);
          history.push("/");
        }
        if (data.status === 409) {
          setAlertEmail(true);
          return;
        }
      });
    }
    if (!checkPassword(password)) {
      setAlertPassword(true);

      return;
    }
    if (
      !password.includes(confirmPassword) ||
      !confirmPassword.includes(password)
    ) {
      setAlertConfirmPassword(true);

      return;
    }
  };

  const handlePhone = (e) => {
    const checkNumber = /^[0-9]*$/g;
    if (checkNumber.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  return (
    <div className={`${styles.form_container} `}>
      <h2 className={styles.title}>Registrering</h2>

      <form onSubmit={(e) => handleRegister(e)} className={`${styles.form}`}>
        <div className="form-group">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
            required
            className={`${styles.input} form-control`}
            type="text"
            id="firstname"
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
            required
            className={`${styles.input} form-control`}
            type="text"
            id="lastname"
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <input
            value={phone}
            onChange={(e) => handlePhone(e)}
            autoComplete="off"
            required
            className={`${styles.input} form-control`}
            type="tel"
            id="phone"
            placeholder="Phone Number"
          />
        </div>

        <div className="form-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            className={`${styles.input} form-control`}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            className={`${styles.input} form-control`}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            required
            className={`${styles.input} form-control`}
            type="password"
            id="confirmpassword"
            placeholder="Confirm Password"
          />
        </div>

        <RegistrationAlertBoxes alerts={alerts} />

        <div className="d-flex justify-content-center">
          <button type="submit" className={`${styles.button} btn`}>
            Register
          </button>
        </div>

        <p className={styles.cta}>
          Already an User?{" "}
          <NavLink
            className={styles.login_link}
            exact
            to="#"
            onClick={() => setShowLogin(true)}
          >
            <u>Sign In Here</u>
          </NavLink>
        </p>
        <hr className={styles.hr} />
      </form>
    </div>
  );
};

export default RegistrationForm;
