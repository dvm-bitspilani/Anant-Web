import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.scss';
import Asteroid from './Asteroid';
import { randomInt } from '../../../global';

const timeline = gsap.timeline()

export default function Hero() {

	useGSAP(() => {
		timeline.from(`.${styles.earthMedia}`, {
				duration: 5,
				x: `-100%`,
				y: `-100%`,
				scale: 1.2,
				ease: 'sine.out'
			}, '+=3')
			.from(`.${styles.asteroidContainer}`, {
				duration: 5, 
				x: `25%`,
				y: `100%`,
				scale: 10,
				rotateZ: 15,
				ease: 'power2.out'
			}, `-=5`)
			.from(`.${styles.satelliteImage}`, {
				duration: 3,
				x: `-100%`,
				ease: 'sine.out',
				scale: 0.8,
			}, '-=1.5')
			.from(`.${styles.mainLogo}`, {
				duration: 1.5,
				y: -30,
				opacity: 0
			})

		gsap.to(`.${styles.satelliteImage}`, {
			duration: 3,
			y: -15,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
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
			mouseParallax(event, `.${styles.satelliteImageWrapper}`, 40);
			
			// mouseMoveTimeOut = setTimeout(() => {
			// 	mouseParallax(event, `.${styles.satelliteImageWrapper}`, 0);
			// }, 300)
		}

		//* Activate mouse parallax after intro animation is completed (except for intro)
		const mouseMoveEventRegisterTimeOut = setTimeout(() => {
			window.addEventListener("mousemove", mouseMoveHandler)
		}, 9500);
		

		return () => {
			window.removeEventListener("mousemove", mouseMoveHandler);
			clearTimeout(mouseMoveEventRegisterTimeOut)
		}
	}, [])

	
	return (
		<div className={styles.hero}>
			<div className={styles.earthMediaWrapper}>
				<img className={styles.earthMedia} src={`./assets/images/home-earth.png`} />
				<div className={styles.satelliteImageWrapper}>
					<img className={styles.satelliteImage} src={`./assets/images/home-satellite.png`} />
				</div>
			</div>
			<div className={styles.asteroidContainer}>
				{
					Array(60).fill(null).map((elem, index) => <Asteroid key={index} className={styles.asteroid} />)
				}
			</div>
			<div className={styles.mainLogoWrapper}>
				<img className={styles.mainLogo} src={`./assets/images/home-anant-logo.png`} />
			</div>
		</div>
	)
}
