import React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  name: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
