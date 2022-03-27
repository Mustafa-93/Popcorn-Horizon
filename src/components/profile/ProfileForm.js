import styles from "../../css/ProfileForm.module.css";
import { useContext, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { checkEmail, checkPassword } from "../../utilities/utilities";
import ProfileFormAlertBoxes from "./ProfileFormAlertBoxes";
import ProfileFormInputFields from "./ProfileFormInputFields";

const ProfileForm = () => {
  const { loggedInUser, userUpdate } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editInput, setEditInput] = useState({
    firstNameDisabled: true,
    lastNameDisabled: true,
    phoneDisabled: true,
    emailDisabled: true,
    passwordDisabled: true,
  });

  const [alertEmptyInput, setAlertEmptyInput] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertPassword, setAlertPassword] = useState(false);
  const [alertConfirmPassword, setAlertConfirmPassword] = useState(false);
  const [alertEmailExists, setAlertEmailExists] = useState(false);
  const [alertEmailInvalid, setAlertEmailInvalid] = useState(false);

  useEffect(() => {
    setDefaultUserInformation();
  }, [loggedInUser]);
  const setDefaultUserInformation = () => {
    setFirstName(loggedInUser?.firstName);
    setLastName(loggedInUser?.lastName);
    setPhone(loggedInUser?.phoneNumber);
    setEmail(loggedInUser?.email);
  };

  const handlePhone = (value) => {
    const checkNumber = /^[0-9]*$/g;

    if (checkNumber.test(value)) {
      setPhone(value);
    }
  };
  const handleEditInput = (e, input) => {
    setAlertEmptyInput(false);
    setAlertConfirm(false);
    setAlertPassword(false);
    setAlertConfirmPassword(false);
    setAlertEmailExists(false);
    setAlertEmailInvalid(false);
    let newObject = { ...editInput };
    Object.keys(newObject).forEach((key) => {
      if (key === input) {
        return (newObject[key] = false);
      } else {
        return (newObject[key] = true);
      }
    });
    setEditInput(newObject);
  };
  const handleFirstNameConfirmEdit = () => {
    if (!firstName) {
      setAlertEmptyInput(true);
      return;
    }

    userUpdate({ firstName: firstName }).then((data) => {
      if (data === true) {
        setAlertConfirm(true);
        setEditInput({ ...editInput, firstNameDisabled: true });

        return;
      }
    });
  };

  const handleLastNameConfirmEdit = () => {
    if (!lastName) {
      setAlertEmptyInput(true);
      return;
    }

    userUpdate({ lastName: lastName }).then((data) => {
      if (data === true) {
        setAlertConfirm(true);
        setEditInput({ ...editInput, lastNameDisabled: true });

        return;
      }
    });
  };

  const handlePhoneConfirmEdit = () => {
    if (!phone) {
      setAlertEmptyInput(true);
      return;
    }

    userUpdate({ phoneNumber: phone }).then((data) => {
      if (data === true) {
        setAlertConfirm(true);
        setEditInput({ ...editInput, phoneDisabled: true });

        return;
      }
    });
  };

  const handlePasswordConfirmEdit = () => {
    if (checkPassword(password) && confirmPassword.includes(password)) {
      userUpdate({ password: password }).then((data) => {
        if (data === true) {
          setAlertConfirm(true);
          setEditInput({ ...editInput, passwordDisabled: true });
          setPassword("");
          setConfirmPassword("");

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

  const handleEmailEdit = () => {
    if (!checkEmail(email)) {
      setAlertEmailInvalid(true);
      return;
    } else {
      userUpdate({ email: email }).then((data) => {
        if (data === true) {
          setAlertConfirm(true);
          setEditInput({ ...editInput, emailDisabled: true });

          return;
        }
        if (data.status === 409) {
          setAlertEmailExists(true);

          return;
        }
      });
    }
  };
  const values = {
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
    handlePhone,
    handleEditInput,
    handleFirstNameConfirmEdit,
    handleLastNameConfirmEdit,
    handlePhoneConfirmEdit,
    handlePasswordConfirmEdit,
    handleEmailEdit,
  };

  return (
    <form className={styles.form}>
      <ProfileFormInputFields values={values} />
      <Row noGutters>
        <Col xs={11} sm={11} md={10} lg={11}>
          <ProfileFormAlertBoxes values={values} />
        </Col>
      </Row>
    </form>
  );
};

export default ProfileForm;
