import { NavLink } from "react-router-dom";
import style from "../css/NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={`container ${style.mainContainer}`}>
      <h1 className={style.notFoundHeading}>
        404! Sorry, the page could not be found ...
      </h1>
      <p className={style.paraText}>Go back to the Homepage.</p>
      <NavLink to="/" className={`${style.linkStyle}`}>
        <button className={`btn ${style.homeBtn}`}>Homepage</button>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
