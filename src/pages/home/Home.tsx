// import React, { type ReactElement } from 'react'
import Hero from "./components/Hero";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { useGSAP, type ReactRef } from "@gsap/react";
import { forwardRef, useRef } from "react";
import StarBackground from "../commonComponent/starbg/StarBackground";

const Home = forwardRef<HTMLDivElement>((_, ref) => {
	const homeStarContainerRef: ReactRef = useRef(null);
	const starClass = "star";

	useGSAP(() => {
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
					{/* { Array(25)
						.fill(null)
						.map(() => (
							<Star className={styles.star} />
					))} */}
				</div>
				<Hero></Hero>
			</StarBackground>
		</div>
	);
});

export default Home;
