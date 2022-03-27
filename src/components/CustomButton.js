import React from "react";
import styles from "../css/CustomButton.css";

export default function CustomButton({ text, clickHandler }) {
  const defineClass = (text) => {
    if (text === "Book") {
      return "bookButton";
    }
    if (text === "Info") {
      return "infoButton";
    }
    if (text === "Avboka") {
      return "cancelButton";
    }
    if (text === "SIGN IN") {
      return "loginButton";
    }
    if (text === "Registrera") {
      return "signInButton";
    }
    if (text === "OK") {
      return "okButton";
    }
    if (text === "Book Ticket") {
      return "bookTicketButton";
    }
    if (text === "Trailer") {
      return "trailerButton";
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={defineClass(text)} onClick={clickHandler}>
        {text}
      </div>
    </div>
  );
}
