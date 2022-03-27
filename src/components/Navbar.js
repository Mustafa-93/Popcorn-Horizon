import React, { useContext } from "react";
import styles from "../css/Navbar.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../contexts/UserContext";
import Login from "../components/login/Login";
import { Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import style from "../css/Login.module.css";
function Navbar1() {
  const {
    handleCloseLoginModal,
    handleShowLoginModal,
    showLogin,
    loggedInUser,
    logout,
  } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const handleLogout = () => {
    logout().then((data) => {
      if (data === true) {
        if (
          location.pathname === "/profile" ||
          location.pathname.includes("/order/")
        ) {
          history.push("/");
        }
      }
    });
  };
  return (
    <Navbar className={styles.nav} collapseOnSelect expand="md" variant="dark">
      <Navbar.Brand as={Link} to="/">
        <span className={styles.font}>Popcorn Horizon 🍿🎬</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <Nav className={styles.nav_links}>
          <Nav.Link as={Link} to="/about" className={styles.link}>
            About
          </Nav.Link>
          {loggedInUser ? (
            <Nav.Link as={Link} to="/profile" className={styles.link}>
              My Profile
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/registration" className={styles.link}>
              Register
            </Nav.Link>
          )}
          {loggedInUser ? (
            <Nav.Link onClick={handleLogout} className={styles.link}>
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link onClick={handleShowLoginModal} className={styles.link}>
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal
        size={"md"}
        centered={true}
        show={showLogin}
        onHide={handleCloseLoginModal}
      >
        <ModalHeader
          className={style.modalCloseButton}
          closeButton
        ></ModalHeader>
        <Login />
      </Modal>
    </Navbar>
  );
}
export default Navbar1;
