import React, { type ReactElement } from 'react'
import Hero from './components/Hero'
import styles from './Home.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { randomInt } from '../../global'


const Star = ({className}: {className: string}) => {

	let customStyles: object = {
		top: `${randomInt(0, 100)}%`,
		left: `${randomInt(0, 100)}%`,
		opacity: randomInt(40, 75)/100,
		width: `${randomInt(2, 5)}px`
	}

	return (<div className={className} style={customStyles} />)
}

export default function Home() {

	useGSAP(() => {
		gsap.from(`.${styles.star}`, {
			duration: 3,
			stagger: 0.09, 
			top: '50%',
			left: '50%',
			opacity: -1
		})

		gsap.from(`.${styles.homeBgImg}`, {
			duration: 2,
			opacity: 0,
			delay: 3,
		})
	})

	return (
		<div className={styles.homePage}>
			<div className={styles.homeBg}>
				<div className={styles.homeBgImg}></div>
				{
					Array(25).fill(null).map(() => <Star className={styles.star} />)
				}
			</div>
			<Hero></Hero>
		</div>
	)
}
