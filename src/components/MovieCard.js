import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import styles from "../css/MovieCard.module.css";
import CustomButton from "./CustomButton";
import BookButton from "./BookButton";

export default function MovieCard({ movie }) {
  const history = useHistory();

  const handleInfoClick = () => history.push(`/movies/${movie._id}`);
  return (
    <Card className={`${styles.cardWrapper} mb-2 mx-2 mx-lg-4`}>
      <Card.Img style={{ maxHeight: "350px" }} src={movie.image} />
      <Card.Body className={styles.bodyWrapper}>
        <Card.Title className={styles.title}>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Card.Text>Length: {movie.length} min</Card.Text>
        <div className="d-flex justify-content-between mt-4">
          <CustomButton clickHandler={handleInfoClick} text="Info" />
          <BookButton movieId={movie._id} movieTitle={movie.title} />
        </div>
      </Card.Body>
    </Card>
  );
}
