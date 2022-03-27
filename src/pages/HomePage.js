import MovieWrapper from "../components/MovieWrapper";
import ImgCarousel from "../components/ImgCarousel";
import MovieSchedule from "../components/MovieSchedule";
import styles from "../css/HomePage.module.css";
import { Row, Col } from "react-bootstrap";
import FilterWrapper from "../components/search/FilterWrapper";
import React, { useEffect, useState, useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

const HomePage = () => {
  const { getScreeningsForMovie } = useContext(MovieContext);
  const [screenings, setScreenings] = useState(null);

  useEffect(() => {
    async function getTodaysScreenings() {
      let schedule = await getScreeningsForMovie(
        "",
        new Date().toLocaleDateString("sv-SV")
      );
      setScreenings(schedule);
    }
    getTodaysScreenings();
  }, []);

  return (
    <div className="homePage">
      <ImgCarousel />
      <Row noGutters={true} className="mx-3 mx-sm-4 mx-lg-auto">
        <Col
          xs={12}
          lg={{ offset: 1, span: 10 }}
          xl={{ offset: 2, span: 8 }}
          className="p-1 my-2"
        >
          <FilterWrapper />
        </Col>
        <Col xs={12} lg={12} xl={12}>
          <MovieWrapper />
        </Col>
      </Row>

      <div className={styles.scheduleWrapper}>
        <h2>Shown today</h2>
        {screenings &&
          screenings.map((movieScreen) => (
            <MovieSchedule
              key={movieScreen._id}
              time={movieScreen.startTime.toLocaleString("sv-SE").slice(11, 16)}
              title={movieScreen.movieId.title}
              auditorium={movieScreen.auditoriumName}
              isHomePage={true}
              movieId={movieScreen.movieId._id}
              screeningId={movieScreen._id}
            />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
