import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.scss';
import { randomInt } from '../../global';

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
			.from(`.${styles.satelliteImage}`, {
				duration: 3,
				x: `-100%`,
				ease: 'sine.out',
				scale: 0.8
			}, '-=1.5')
			.from(`.${styles.mainLogo}`, {
				duration: 1.5,
				y: -15,
				opacity: 0
			})
			// .from(`.${styles.asteroid}`, {
			// 	duration: randomInt(100, 300)/10,
			// 	top: '0%',
			// 	left: '100%',
			// 	ease: 'sine.out'
			// })

		gsap.to(`.${styles.satelliteImage}`, {
			duration: 3,
			y: -30,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
		})

	})

	const Asteroid = ({className, key}: {className: string, key: number}) => {

		const astroRef = useRef(null)

		useGSAP(() => {
			const timeLine = gsap.timeline()
			const randDuration = randomInt(300, 600)/10
			const randDelay = randomInt(0, 600)/10
			timeLine.fromTo(astroRef.current, {
				top: '0%',
				left: `${randomInt(95, 125)}%`,
				y: '-200%',
				rotateZ: randomInt(0, 360)
			}, {
				y: '100%',
				top: `100%`,
				left: `${randomInt(5, 30)}%`,
				duration: randDuration,
				ease: "none",
				delay: randDelay,
				rotateZ: randomInt(0, 360),
				onComplete: () => {
					timeLine.restart()
				}
			})
			//timeLine.seek((randomInt(0, 10)/10)*randDuration)
			
		})

		let customStyles = {
			width: `${randomInt(5, 75)}px`,
			left: '100%',
			top: '0%',
		}

		return <img ref={astroRef} className={className} src={`./assets/images/asteroid-${randomInt(1, 13 + 1)}.png`} style={customStyles} />
	}

	return (
		<div className={styles.hero}>
			<div className={styles.earthMediaWrapper}>
				<img className={styles.earthMedia} src={`./assets/images/home-earth.png`} />
				<img className={styles.satelliteImage} src={`./assets/images/home-satellite.png`} />
			</div>
			<div className={styles.asteroidContainer}>
				{
					Array(75).fill(null).map((elem, index) => <Asteroid key={index} className={styles.asteroid} />)
				}
			</div>
			<div className={styles.mainLogoWrapper}>
				<img className={styles.mainLogo} src={`./assets/images/home-anant-logo.png`} />
			</div>
		</div>
	)
}
