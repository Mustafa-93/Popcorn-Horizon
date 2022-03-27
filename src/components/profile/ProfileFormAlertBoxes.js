import { Alert } from "react-bootstrap";

const ProfileFormAlertBoxes = ({ values }) => {
  const {
    alertEmptyInput,
    setAlertEmptyInput,
    alertConfirm,
    setAlertConfirm,
    alertPassword,
    setAlertPassword,
    alertConfirmPassword,
    setAlertConfirmPassword,
    alertEmailExists,
    setAlertEmailExists,
    alertEmailInvalid,
    setAlertEmailInvalid,
  } = values;
  const alertEmptyInputBox = alertEmptyInput && (
    <Alert variant="dark" onClose={() => setAlertEmptyInput(false)} dismissible>
      <p>The field must not be empty.</p>
    </Alert>
  );

  const alertConfirmBox = alertConfirm && (
    <Alert variant="dark" onClose={() => setAlertConfirm(false)} dismissible>
      <p>Your profile has now changed!</p>
    </Alert>
  );

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

  const alertEmailExistsBox = alertEmailExists && (
    <Alert
      variant="dark"
      onClose={() => setAlertEmailExists(false)}
      dismissible
    >
      <p>Choose another email!</p>
    </Alert>
  );

  const alertEmailInvalidBox = alertEmailInvalid && (
    <Alert
      variant="dark"
      onClose={() => setAlertEmailInvalid(false)}
      dismissible
    >
      <p>
        Try again! <br />
        Your email must contain an @ symbol followed by a domain name.
      </p>
    </Alert>
  );
  return (
    <>
      {alertEmptyInputBox}
      {alertConfirmBox}
      {alertPasswordBox}
      {alertConfirmPasswordBox}
      {alertEmailExistsBox}
      {alertEmailInvalidBox}
    </>
  );
};

export default ProfileFormAlertBoxes;
