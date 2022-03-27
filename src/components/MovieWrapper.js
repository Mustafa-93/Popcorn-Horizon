import { useContext, useState } from "react";
import MovieCard from "./MovieCard";
import styles from "../css/MovieWrapper.module.css";
import React from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function MovieWrapper() {
  const { allMovies, userRequest } = useContext(MovieContext);

  const [showAllMovies, setShowAllMovies] = useState(false);

  const renderCards = () => {
    if (allMovies && allMovies.length === 0) {
      return (
        <p className="p-5 h4 border m-5">
          Sorry, the search returned no results...
        </p>
      );
    } else if (
      allMovies &&
      (showAllMovies || Object.keys(userRequest).length !== 0)
    ) {
      return allMovies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ));
    } else if (
      allMovies &&
      Object.keys(userRequest).length === 0 &&
      !showAllMovies
    ) {
      return allMovies
        .map((movie) => <MovieCard key={movie._id} movie={movie} />)
        .slice(0, 8);
    } else {
      return <p>...loading</p>;
    }
  };

  return (
    <div className="mt-3">
      {Object.keys(userRequest).length === 0 ? (
        <h2 className={styles.heading}>
          {showAllMovies ? "All movies" : "Most watched movies"}
        </h2>
      ) : (
        <h2 className={styles.heading}>Search results</h2>
      )}
      <div
        className={`${styles.wrapper} p-0 my-4 mx-2 mx-lg-4 d-flex flex-wrap justify-content-center mx-xl-auto`}
      >
        {renderCards()}

        {Object.keys(userRequest).length === 0 && (
          <div
            className={`col-12 justify-content-end ${styles.showAllBtnContainer}`}
          >
            <button
              className={styles.showAllBtn}
              onClick={() => setShowAllMovies(!showAllMovies)}
            >
              {showAllMovies ? (
                <span>
                  Show fewer <i className="fas fa-arrow-up"></i>
                </span>
              ) : (
                <span>
                  Show all movies <i className="fas fa-arrow-down"></i>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
