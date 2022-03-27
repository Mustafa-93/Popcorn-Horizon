import { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import MultiRangeSlider from "./MultiRangeSlider";

const LengthOptions = () => {
  const filterOptions = require("../../utilities/filterOptions/filterOptions.json");

  const minMaxLength = {
    minLength: Math.min(...filterOptions.movieLengths),
    maxLength: Math.max(...filterOptions.movieLengths),
  };

  const { userRequest, setUserRequest } = useContext(MovieContext);

  const setMinLengthQuery = (value) => {
    setUserRequest({ ...userRequest, minLength: value });
  };
  const setMaxLengthQuery = (value) => {
    setUserRequest({ ...userRequest, maxLength: value });
  };

  return (
    <div className="pt-2 pb-5">
      <MultiRangeSlider
        min={minMaxLength.minLength}
        max={minMaxLength.maxLength}
        setMaxLengthQuery={setMaxLengthQuery}
        setMinLengthQuery={setMinLengthQuery}
      />
    </div>
  );
};

export default LengthOptions;
