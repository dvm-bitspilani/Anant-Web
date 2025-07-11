// import React, { type ReactElement } from 'react'
import Hero from "./components/Hero";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { useGSAP, type ReactRef } from "@gsap/react";
import { forwardRef, useRef } from "react";
import StarBackground from "../commonComponent/starbg/StarBackground";
import About from "./components/About";
import { useLocation } from "react-router-dom";

const Home = forwardRef<HTMLDivElement>((_, ref) => {
	const homeStarContainerRef: ReactRef = useRef(null);
	const starClass = "star";
	const location = useLocation();

	useGSAP(() => {
		if (location.pathname !== "/") return
		gsap.from(`.${starClass}`, {
			duration: 3,
			stagger: 0.09,
			top: "50%",
			left: "50%",
			opacity: -1,
		});
	}, {scope: homeStarContainerRef.current});

	return (
		<div className={styles.homePage} ref={ref}>
			<StarBackground numOfStars={25} starClass={starClass}>
				<div className={styles.homeBg} ref={homeStarContainerRef}>
					<div className={styles.homeBgImg}></div>
				</div>
				<Hero></Hero>
			</StarBackground>
			<About />
		</div>
	);
});

export default Home;
