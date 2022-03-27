import { Alert } from "react-bootstrap";

const RegistrationAlertBoxes = ({ alerts }) => {
  const {
    alertPassword,
    setAlertPassword,
    alertEmail,
    setAlertEmail,
    alertConfirmPassword,
    setAlertConfirmPassword,
  } = alerts;
  const alertPasswordBox = alertPassword && (
    <Alert variant="dark" onClose={() => setAlertPassword(false)} dismissible>
      <p>
        Try again! <br />
        Your password must contain at least 8 characters, of which one uppercase
        letter, one number and 1 sepacial character.
      </p>
    </Alert>
  );

  const alertConfirmPasswordBox = alertConfirmPassword && (
    <Alert
      variant="dark"
      onClose={() => setAlertConfirmPassword(false)}
      dismissible
    >
      <p>
        Try again!
        <br />
        Your password must match.
      </p>
    </Alert>
  );

  const alertEmailBox = alertEmail && (
    <Alert variant="dark" onClose={() => setAlertEmail(false)} dismissible>
      <p>Choose another email!</p>
    </Alert>
  );

  return (
    <>
      {alertEmailBox}
      {alertPasswordBox}
      {alertConfirmPasswordBox}
    </>
  );
};

export default RegistrationAlertBoxes;
