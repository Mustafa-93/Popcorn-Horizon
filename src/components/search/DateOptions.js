import { useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";

const DateOptions = () => {
  const { userRequest, setUserRequest } = useContext(MovieContext);

  return (
    <>
      <label></label>
      <input
        type="date"
        value={userRequest.startTime || ""}
        onChange={(e) =>
          setUserRequest({ ...userRequest, startTime: e.target.value })
        }
      />
    </>
  );
};

export default DateOptions;
