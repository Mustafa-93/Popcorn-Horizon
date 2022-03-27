import { useContext, useEffect } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import styles from "./styles/FilterWrapper.module.css";

const AgeLimitOptions = () => {
  const filterOptions = require("../../utilities/filterOptions/filterOptions.json");

  const { userRequest, setUserRequest } = useContext(MovieContext);

  useEffect(() => {
    if (Object.keys(userRequest).length === 0) {
      let radios = document.querySelectorAll("input.ageLimitRadio");
      radios.forEach((radio) => (radio.checked = false));
    }
  }, [userRequest]);

  return (
    <div className={styles.radioButtonsContainer}>
      {filterOptions.movieAgeLimits.map((limit, i) => (
        <div key={i} className={styles.radioInputLabel}>
          <input
            className="ageLimitRadio"
            type="radio"
            value={limit}
            name="ageLimit"
            onChange={(e) =>
              setUserRequest({ ...userRequest, ageLimit: e.target.value })
            }
          />
          <label htmlFor={limit} className="ml-2 ageLimitRadio">
            {limit.slice(3)} Year
          </label>
        </div>
      ))}
    </div>
  );
};

export default AgeLimitOptions;
