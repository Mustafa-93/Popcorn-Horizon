import styles from "../../css/ProfileFormInputFields.module.css";
import { Row, Col } from "react-bootstrap";

const ProfileFormInputFields = ({ values }) => {
  const {
    loggedInUser,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    editInput,
    setEditInput,
    setDefaultUserInformation,
    setAlertEmailExists,
    setAlertEmailInvalid,
    setAlertPassword,
    setAlertConfirmPassword,
    handlePhone,
    handleEditInput,
    handleFirstNameConfirmEdit,
    handleLastNameConfirmEdit,
    handlePasswordConfirmEdit,
    handleEmailEdit,
    handlePhoneConfirmEdit,
  } = values;
  return (
    <>
      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <div className="form-group">
            <label className="pl-2" htmlFor="firstname">
              First Name:
            </label>

            <input
              style={{ opacity: editInput.firstNameDisabled && "0.45" }}
              disabled={editInput.firstNameDisabled}
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                    .replace(/[&/\\#,+()$~%.'":*?<>{}^_@!]/g, "")
                    .replace(/[0-9]/g, "")
                )
              }
              autoComplete="off"
              required
              className={`${styles.input} form-control`}
              type="text"
              id="firstname"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
          sm={1}
          md={2}
          lg={1}
        >
          {editInput.firstNameDisabled ? (
            <i
              onClick={(e) => {
                setDefaultUserInformation();
                handleEditInput(e, "firstNameDisabled");
              }}
              className={`${styles.icon} fas fa-edit`}
            />
          ) : (
            <>
              <i
                onClick={handleFirstNameConfirmEdit}
                className={`${styles.icon} fas fa-check pl-3`}
              ></i>
              <i
                onClick={() => {
                  setEditInput({ ...editInput, firstNameDisabled: true });
                  setFirstName(loggedInUser.firstName);
                }}
                className={`${styles.icon} fas fa-times pl-2`}
              ></i>
            </>
          )}
        </Col>
      </Row>

      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <div className="form-group">
            <label className="pl-2" htmlFor="lastname">
              Last Name:
            </label>

            <input
              style={{ opacity: editInput.lastNameDisabled && "0.45" }}
              disabled={editInput.lastNameDisabled}
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                    .replace(/[&/\\#,+()$~%.'":*?<>{}^_@!]/g, "")
                    .replace(/[0-9]/g, "")
                )
              }
              autoComplete="off"
              required
              className={`${styles.input} form-control`}
              type="text"
              id="lastname"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
          sm={1}
          md={2}
          lg={1}
        >
          {editInput.lastNameDisabled ? (
            <i
              onClick={(e) => {
                setDefaultUserInformation();
                handleEditInput(e, "lastNameDisabled");
              }}
              className={`${styles.icon} fas fa-edit`}
            />
          ) : (
            <>
              <i
                onClick={handleLastNameConfirmEdit}
                className={`${styles.icon} fas fa-check pl-3`}
              ></i>
              <i
                onClick={() => {
                  setEditInput({ ...editInput, lastNameDisabled: true });
                  setLastName(loggedInUser.lastName);
                }}
                className={`${styles.icon} fas fa-times pl-2`}
              ></i>
            </>
          )}
        </Col>
      </Row>

      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <div className="form-group">
            <label className="pl-2" htmlFor="phone">
              Phone Number:
            </label>

            <input
              style={{ opacity: editInput.phoneDisabled && "0.45" }}
              disabled={editInput.phoneDisabled}
              value={phone}
              onChange={(e) =>
                handlePhone(e.target.value.substring(0, 10) || "")
              }
              autoComplete="off"
              required
              className={`${styles.input} form-control`}
              type="tel"
              id="phone"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
          sm={1}
          md={2}
          lg={1}
        >
          {editInput.phoneDisabled ? (
            <i
              onClick={(e) => {
                setDefaultUserInformation();
                handleEditInput(e, "phoneDisabled");
              }}
              className={`${styles.icon} fas fa-edit`}
            />
          ) : (
            <>
              <i
                onClick={handlePhoneConfirmEdit}
                className={`${styles.icon} fas fa-check pl-3`}
              ></i>
              <i
                onClick={() => {
                  setEditInput({ ...editInput, phoneDisabled: true });
                  setPhone(loggedInUser.phoneNumber);
                }}
                className={`${styles.icon} fas fa-times pl-2`}
              ></i>
            </>
          )}
        </Col>
      </Row>

      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <div className="form-group">
            <label className="pl-2" htmlFor="email">
              Email:
            </label>

            <input
              style={{ opacity: editInput.emailDisabled && "0.45" }}
              disabled={editInput.emailDisabled}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className={`${styles.input} form-control`}
              type="email"
              id="email"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
          sm={1}
          md={2}
          lg={1}
        >
          {editInput.emailDisabled ? (
            <i
              onClick={(e) => {
                setDefaultUserInformation();
                handleEditInput(e, "emailDisabled");
              }}
              className={`${styles.icon} fas fa-edit`}
            />
          ) : (
            <>
              <i
                onClick={handleEmailEdit}
                className={`${styles.icon} fas fa-check pl-3`}
              ></i>
              <i
                onClick={() => {
                  setEditInput({ ...editInput, emailDisabled: true });
                  setEmail(loggedInUser.email);
                  setAlertEmailExists(false);
                  setAlertEmailInvalid(false);
                }}
                className={`${styles.icon} fas fa-times pl-2`}
              ></i>
            </>
          )}
        </Col>
      </Row>

      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <div className="form-group">
            <label className="pl-2" htmlFor="password">
              New password:
            </label>

            <input
              style={{ opacity: editInput.passwordDisabled && "0.45" }}
              disabled={editInput.passwordDisabled}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
              className={`${styles.input} form-control`}
              type="password"
              id="password"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
          sm={1}
          md={2}
          lg={1}
        >
          {editInput.passwordDisabled ? (
            <i
              onClick={(e) => {
                setDefaultUserInformation();
                handleEditInput(e, "passwordDisabled");
              }}
              className={`${styles.icon} fas fa-edit`}
            />
          ) : (
            <>
              <i
                onClick={handlePasswordConfirmEdit}
                className={`${styles.icon} fas fa-check pl-3`}
              ></i>
              <i
                onClick={() => {
                  setEditInput({ ...editInput, passwordDisabled: true });
                  setPassword("");
                  setConfirmPassword("");
                  setAlertPassword(false);
                  setAlertConfirmPassword(false);
                }}
                className={`${styles.icon} fas fa-times pl-2`}
              ></i>
            </>
          )}
        </Col>
      </Row>

      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <div className="form-group">
            <label className="pl-2" htmlFor="password">
              Confirm new password:
            </label>

            <input
              style={{ opacity: editInput.passwordDisabled && "0.45" }}
              disabled={editInput.passwordDisabled}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
              className={`${styles.input} form-control`}
              type="password"
              id="confirmpassword"
            />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
          sm={1}
          md={2}
          lg={1}
        ></Col>
      </Row>
    </>
  );
};

export default ProfileFormInputFields;
