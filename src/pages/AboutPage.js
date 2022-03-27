import React from "react";
import styles from "../css/About.module.css";
import { Carousel } from "react-bootstrap";

const AboutPage = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className={styles.aboutContainer}
            src="https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_960_720.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className={styles.upper_wrapper}>
        <h2 className={styles.textHeading}>Popcorn Horizon 🍿🎬</h2>
        <p>
          Our goal is to provide Hollywood's most modern, comfortable cinema
          viewing experience and quality releases for a locally adjusted price
          for our youth and family-centered audiences in Stockholm. We aim to be
          the highest-value entertainment provider in Sweden with integrity and
          professionalism in every step.
        </p>
      </div>
      <h4 className={styles.h4}>Contact Information</h4>
      <div className={styles.low}>
        <div className={styles.days_wrapper}>
          <p>Saturday - Friday</p>
          <p>Time: 10.00 - 22.00</p>
        </div>
        <div>
          <p>Stockholm, Sweden</p>
          <p>Email: popcornhorizon@gmail.com</p>
        </div>
      </div>
      <div className={styles.karta}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16294.247198180983!2d18.036007991456078!3d59.3032163727593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77f07615e5e7%3A0xe73898edd9d07e52!2sFilmstaden%20S%C3%B6der!5e0!3m2!1sen!2sus!4v1647433833931!5m2!1sen!2sus"
          width="50%"
          height="250"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          title="Embedded map"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutPage;
