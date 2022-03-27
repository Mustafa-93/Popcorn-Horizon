import { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";

const OptionsSelect = ({ selectType }) => {
  const filterOptions = require("../../utilities/filterOptions/filterOptions.json");

  const { userRequest, setUserRequest } = useContext(MovieContext);

  const renderPriceOptions = () => {
    return (
      <>
        <select
          value={userRequest.price || ""}
          onChange={(e) =>
            setUserRequest({ ...userRequest, price: e.target.value })
          }
        >
          <option value=""></option>
          {filterOptions.priceOptions.sort().map((num, i) => (
            <option key={i} value={num}>
              {num} kr
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderGenreOptions = () => {
    return (
      <>
        <select
          value={userRequest.genre || ""}
          onChange={(e) =>
            setUserRequest({ ...userRequest, genre: e.target.value })
          }
        >
          <option value=""></option>
          {filterOptions.movieGenres.sort().map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </>
    );
  };

  const renderLanguageOptions = () => {
    return (
      <>
        <select
          value={userRequest.language || ""}
          onChange={(e) =>
            setUserRequest({ ...userRequest, language: e.target.value })
          }
        >
          <option value=""></option>
          {filterOptions.movieLanguages.sort().map((lang, i) => (
            <option key={i} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </>
    );
  };
  return selectType === "price"
    ? renderPriceOptions()
    : selectType === "genre"
    ? renderGenreOptions()
    : renderLanguageOptions();
};

export default OptionsSelect;
