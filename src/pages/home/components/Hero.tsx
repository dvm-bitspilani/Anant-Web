import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP, type ReactRef } from '@gsap/react';
import styles from './Hero.module.scss';
import Asteroid from './Asteroid';
import { useLocation } from 'react-router-dom';

const timeline = gsap.timeline()

export default function Hero() {

	const location = useLocation();
	const lightSourceRef: ReactRef = useRef(null);
	const heroRef: ReactRef = useRef(null);
	const [astroIntroOver, setAstroIntroOver] = useState(false);

	useGSAP(() => {
		gsap.to(`.${styles.satelliteImage}`, {
			duration: 3,
			y: -15,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
		})

		gsap.registerPlugin(ScrollTrigger);
		gsap.to(`.${styles.earthMedia}`, {
			scrollTrigger: {
				trigger: heroRef.current,
				scrub: true,
				start: "top 0%"
			},
			top: '30vh',
			ease: "sine.out"
		})
		gsap.to(`.${styles.starLightSource}`, {
			scrollTrigger: {
				trigger: heroRef.current,
				scrub: true,
				start: "top 0%"
			},
			opacity: -0.5
		})
		gsap.to(`.${styles.satelliteImage}`, {
			scrollTrigger: {
				trigger: heroRef.current,
				scrub: true,
				start: "top 0%"
			},
			top: '+=75px',
		})


		if (location.pathname !== "/") return
		timeline.from(`.${styles.earthWrapper}`, {
				duration: 5,
				x: `-100%`,
				y: `-100%`,
				scale: 1.2,
				ease: 'sine.out'
			}, 2)
			.from(`.${styles.asteroidContainer}`, {
				duration: 5, 
				x: `25%`,
				y: `200%`,
				scale: 10,
				opacity: -2,
				rotateZ: 15,
				ease: 'power2.out'
			}, 2)
			.from(`.${styles.satelliteImage}`, {
				duration: 3,
				x: `-100%`,
				ease: 'sine.out',
				scale: 0.8,
			}, 5)
			.from(`.${styles.starLightSource}`, {
				duration: 3,
				opacity: 0,
				ease: "sine.out"
			}, 6)
			.from(`.${styles.mainLogo}`, {
				duration: 1.5,
				y: -30,
				opacity: 0
			}, 7.5)
			.set(`.${styles.earthWrapper}, .${styles.satelliteImage}, .${styles.asteroidContainer}`, {
				clearProps: "all"
			})
	})

	const { contextSafe } = useGSAP();
	const mouseParallax = contextSafe((event: MouseEvent, selector: string | null, powerFactor: number) => {
		if (selector == null) return;
		gsap.to(selector, {
			x: ((event.clientX / window.innerWidth) - 0.5) * powerFactor,
			y: ((event.clientY / window.innerHeight) - 0.5) * powerFactor,
		})
	})
	useEffect(() => {
		//let mouseMoveTimeOut: number;
		const mouseMoveHandler = (event: MouseEvent) => {
			//if (mouseMoveTimeOut !== undefined) 
			mouseParallax(event, `.${styles.satelliteImageWrapper}`, 30);
			
			// mouseMoveTimeOut = setTimeout(() => {
			// 	mouseParallax(event, `.${styles.satelliteImageWrapper}`, 0);
			// }, 300)
		}

		//* Activate mouse parallax after intro animation is completed (except for intro)
		const mouseMoveEventRegisterTimeOut = setTimeout(() => {
			window.addEventListener("mousemove", mouseMoveHandler)
		}, location.pathname === "/" ? 7500 : 0);
		

		return () => {
			window.removeEventListener("mousemove", mouseMoveHandler);
			clearTimeout(mouseMoveEventRegisterTimeOut)
		}
	}, [])

	
	return (
		<div ref={heroRef} className={styles.hero}>
			<div className={styles.earthMediaWrapper}>
				<div ref={lightSourceRef} className={styles.starLightSource} />
				<div className={styles.earthWrapper}>
					<video className={styles.earthMedia} muted autoPlay loop>
						<source src='./assets/video/earth.mp4' type='video/mp4'></source>
					</video>
				</div>
				<div className={styles.satelliteImageWrapper}>
					<img className={styles.satelliteImage} src={`./assets/images/home-satellite.png`} />
				</div>
			</div>
			<div className={styles.asteroidContWrapper}>
				<div className={styles.asteroidContainer}>
					{
						Array(30).fill(null).map((value, index) => <Asteroid 
							key={index + value} 
							className={styles.asteroid}
							astroIntroOver={astroIntroOver}
							setAstroIntroOver={setAstroIntroOver} />)
					}
				</div>
			</div>
			<div className={styles.mainLogoWrapper}>
				<img className={styles.mainLogo} src={`./assets/images/home-anant-logo.png`} />
			</div>
		</div>
	)
}
