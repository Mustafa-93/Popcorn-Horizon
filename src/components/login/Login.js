import React, { useState, useContext } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import style from "../../css/Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const { setShowLogin, login } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    login({ email, password }).then((data) => {
      if (data === false) {
        setInvalidLogin(true);
      }
      if (data === true) {
        setShowLogin(false);
        if (location.pathname === "/registration") {
          history.push("/");
        }
      }
    });
  };

  const handleRoute = () => {
    setShowLogin(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={`form-group ${style.modalContainer}`}>
      <h2 className={style.loginHeading}>Sign In</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          className={`form-control ${style.input}`}
          value={email}
          onChange={handleEmail}
          name="email"
          id="email"
          placeholder="Email address"
          autoComplete="off"
          required
        />
        <input
          type="password"
          className={`form-control ${style.input}`}
          value={password}
          onChange={handlePassword}
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="off"
          required
        />

        <button className={`btn ${style.loginBtn}`}>Sign In</button>
      </form>

      {invalidLogin && <p>Try again!</p>}

      <p className={style.regText}>
        <NavLink
          onClick={handleRoute}
          to="/registration"
          className={`${style.linkStyle}`}
        >
          Not a member yet? Register here.
        </NavLink>
      </p>
    </div>
  );
};
export default Login;
