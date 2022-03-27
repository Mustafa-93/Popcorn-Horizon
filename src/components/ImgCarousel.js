import Carousel from "react-bootstrap/Carousel";
import styles from "../css/ImgCarousel.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ImgCarousel = () => {
  const [moviePics, setMoviePics] = useState([]);

  useEffect(() => setMoviePics(require("../assets/caroPics.json")), []);

  return (
    <div className={`container-fluid py-3 p-xl-5 mx-auto`}>
      <Carousel>
        <Carousel.Item interval={7000}>
          <img
            className={`d-block ${styles.caroImg} ${styles.welcomeImg}`}
            src="https://res.cloudinary.com/dolt8nnzc/image/upload/v1647533953/Movie%20SIte/istockphoto-1295114854-170667a_avkezn.jpg"
            alt="Cinema auditorium"
          />
          <Carousel.Caption>
            <h3 className={`${styles.captionText} ${styles.welcomeText}`}>
              Popcorn Horizon 🍿🎬
            </h3>
            <br />
            <p className={`${styles.captionText} ${styles.welcomeText}`}>
              A Theatre for Everybody 🎬
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        {moviePics.map((obj, index) => (
          <Carousel.Item key={index} interval={3500}>
            <Link to={`/movies/${obj.DBId}`}>
              <img
                className={`d-block ${styles.caroImg}`}
                src={obj.imgLink}
                alt={`From the movie ${obj.title}`}
              />
              <Carousel.Caption>
                <div className={styles.captionWrapper}>
                  <p
                    className={`${styles.captionText} ${styles.movieTitleCaption}`}
                  >
                    {obj.title}
                  </p>
                </div>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImgCarousel;
