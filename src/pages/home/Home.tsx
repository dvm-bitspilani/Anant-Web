// import React, { type ReactElement } from 'react'
import Hero from "./Hero";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { randomInt } from "../../global";
import { forwardRef } from "react";

const Star = ({ className }: { className: string }) => {
  let customStyles: object = {
    top: `${randomInt(0, 100)}%`,
    left: `${randomInt(0, 100)}%`,
    opacity: randomInt(4, 8) / 10,
    width: `${randomInt(1, 5)}px`,
  };

  return <div className={className} style={customStyles} />;
};

const Home = forwardRef<HTMLDivElement>((_, ref) => {
  useGSAP(() => {
    gsap.from(`.${styles.star}`, {
      duration: 3,
      stagger: 0.09,
      top: "50%",
      left: "50%",
      opacity: -1,
    });
  });

  return (
    <div className={styles.homePage} ref={ref} id="">
      <div className={styles.homeBg}>
        {Array(50)
          .fill(null)
          .map(() => (
            <Star className={styles.star} />
          ))}
      </div>
      <Hero></Hero>
    </div>
  );
});

export default Home;
