import { createContext, useEffect, useState, useCallback } from "react";
import { debounce } from "../utilities/utilities";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const [allMovies, setAllMovies] = useState(null);
  const [userRequest, setUserRequest] = useState({});
  const fetchFilteredMovies = async (userRequest) => {
    let result = null;
    console.log("userRequest", userRequest);
    if (Object.keys(userRequest).length === 0) {
      result = await fetch("/api/v1/movies/");
    } else {
      let queryString = "";

      for (let key in userRequest) {
        if (userRequest[key] === "") {
          delete userRequest[key];
        } else {
          queryString += `${key}=${userRequest[key]}&`;
        }
      }

      queryString = queryString.slice(0, -1);

      result = await fetch(`/api/v1/movies/?${queryString}`);
    }

    result = await result.json();
    if (result.status !== "error") {
      setAllMovies(result);
    }
  };
  const debounceFetch = useCallback(
    debounce((userRequest) => fetchFilteredMovies(userRequest), 300),
    []
  );

  useEffect(() => debounceFetch(userRequest), [userRequest]);

  const getMovieById = async (movieId) => {
    let result = await fetch(`/api/v1/movies/${movieId}`);
    result = await result.json();

    if (result.status !== "error") {
      return result;
    }
  };

  const getScreeningsForMovie = async (movieId, date) => {
    let queryString;
    if (movieId) {
      queryString = `movieId=${movieId}`;
    }
    if (date) {
      queryString = `date=${date}`;
    }

    let result = await fetch(`/api/v1/screenings/?${queryString}`);
    result = await result.json();

    if (result.status !== "error") {
      result = result.map((screening) => ({
        ...screening,
        startTime: new Date(screening.startTime),
      }));
      return result;
    }
  };

  const values = {
    allMovies,
    getMovieById,
    getScreeningsForMovie,
    userRequest,
    setUserRequest,
  };

  return (
    <MovieContext.Provider value={values}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
