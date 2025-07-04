// import React, { type ReactElement } from 'react'
import Hero from "./components/Hero";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { useGSAP, type ReactRef } from "@gsap/react";
import { randomInt } from "../../global";
import { forwardRef, useRef } from "react";
import StarBackground from "../commonComponent/starbg/StarBackground";

const Star = ({ className }: { className: string }) => {
	const customStylesRef = useRef({
		top: `${randomInt(0, 100)}%`,
		left: `${randomInt(0, 100)}%`,
		opacity: randomInt(4, 8) / 10,
		width: `${randomInt(1, 5)}px`,
	});

	return <div className={className} style={customStylesRef.current} />;
};

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
