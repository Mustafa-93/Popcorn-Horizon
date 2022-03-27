import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { Row, Col, Image, Modal } from "react-bootstrap";
import styles from "../css/MoviePage.module.css";
import MovieSchedule from "../components/MovieSchedule";
import TrailerModal from "../components/TrailerModal";
import CustomButton from "../components/CustomButton";

export default function MoviePage(props) {
  const { movieId } = props.match.params;
  const [movie, setMovie] = useState(null);
  const [screenings, setScreening] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const { getMovieById, getScreeningsForMovie } = useContext(MovieContext);

  useEffect(() => {
    async function getMovieAndScreenings() {
      let response = await getMovieById(movieId);
      setMovie(response);
      let schedule = await getScreeningsForMovie(movieId);
      setScreening(schedule);
    }
    getMovieAndScreenings();
  }, []);
  const getReservedPlaces = (seats) => {
    let reservedPlaces = seats
      .flat()
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return reservedPlaces ? reservedPlaces : "0";
  };

  const seeTrailer = () => {
    setShowTrailerModal(true);
  };

  const handleCloseTrailerModal = () => {
    setShowTrailerModal(false);
  };

  const renderMovieDescription = () => (
    <section className={styles.movieContainer}>
      <Row className="text-center">
        <Col sm={12} md={6} lg={5}>
          <Image src={movie.image} fluid />
        </Col>
        <Col sm={12} md={6} lg={7}>
          <div className=" row flex-column-reverse flex-md-row">
            <div className={styles.description}>
              <h1>{movie.title}</h1>
              <p>{movie.description}</p>
              <hr></hr>
              <p>Director: {movie.director} </p>
              <p>
                Actor:{" "}
                {movie.actors.map((actor, index) => (
                  <span key={index}>{actor} &#183; </span>
                ))}
              </p>
              <p>Language: {movie.language}</p>
              <p>Year: {movie.productionYear}</p>
              <p>
                {" "}
                Length: <span>{movie.length} min</span>
              </p>
              <p>
                Genre:{""} {movie.genre}
              </p>
              <p>
                Age limit: {movie.ageLimit.slice(3, movie.ageLimit.length)} Year
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <CustomButton
                text="Trailer"
                className="order-md-last"
                clickHandler={seeTrailer}
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );

  return (
    <div className="container pb-3">
      {movie ? renderMovieDescription() : <h2>...loading</h2>}
      {screenings ? (
        <div className={styles.scheduleWrapper}>
          <h2>Performances</h2>
          <Row
            className={`border-bottom border-white pb-2 ${styles.scheduleItem}`}
          >
            <Col xs={4} sm={3} className={`${styles.scheduleHeading}`}>
              <h3>Date</h3>
            </Col>
            <Col
              xs={2}
              sm={2}
              className={`text-left ${styles.scheduleHeading}`}
            >
              <h3>Time</h3>
            </Col>
            <Col
              xs={2}
              sm={2}
              className={`text-center ${styles.scheduleHeading}`}
            >
              <h3>Seats Remaining</h3>
            </Col>
            <Col
              xs={0}
              sm={3}
              className={`text-right d-none d-sm-block ${styles.scheduleHeading}`}
            >
              <h3>Salon</h3>
            </Col>
            <Col xs={3} sm={2}></Col>
          </Row>
          {screenings.map((screen) => (
            <MovieSchedule
              key={screen._id}
              isMoviePage={true}
              date={screen.startTime.toLocaleString("sv-SE").slice(0, 11)}
              time={screen.startTime.toLocaleString("sv-SE").slice(11, 16)}
              totalPlaces={screen.seats.flat(Infinity).length}
              reservedPlaces={getReservedPlaces(screen.seats)}
              auditorium={screen.auditoriumName}
              screeningId={screen._id}
              movieId={movieId}
            />
          ))}
        </div>
      ) : (
        <h2>...loading</h2>
      )}

      {movie && (
        <Modal
          centered={true}
          size={"lg"}
          show={showTrailerModal}
          onHide={handleCloseTrailerModal}
        >
          <TrailerModal embedId={movie.youtubeTrailer} />
        </Modal>
      )}
    </div>
  );
}
