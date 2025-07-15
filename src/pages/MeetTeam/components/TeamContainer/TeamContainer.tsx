import React from "react";
import styles from "./TeamContainer.module.scss";
import Card from "../Card/Card";
import classNames from "classnames";

interface CardData {
  name: string;
  image: string;
}

interface TeamContainerProps {
  heading: string;
  teamMembers: CardData[];
  className?: string;
}

const TeamContainer: React.FC<TeamContainerProps> = ({
  heading,
  teamMembers,
  className,
}) => (
  <div className={classNames(styles.team__container, className)}>
    <h3 className={styles.team__heading}>{heading}</h3>
    <div className={styles.team__cards}>
      {teamMembers.map((member, index) => (
        <Card key={index} name={member.name} image={member.image} />
      ))}
    </div>
  </div>
);

export default TeamContainer;
