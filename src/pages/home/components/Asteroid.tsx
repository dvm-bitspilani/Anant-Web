import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.scss';
import { randomInt } from '../../../global';

export default function Asteroid({className, key}: {className: string, key: number}) {

    let customStyles = {
        width: `${randomInt(5, 75)}px`,
    }
    
    const astroRef = useRef(null)
    const astroWrapRef = useRef(null)

    useGSAP(() => {
        const timeLine = gsap.timeline()
        const randDuration = randomInt(300, 600)/10
        // const randDelay = randomInt(0, 600)/10
        timeLine.fromTo(astroWrapRef.current, {
            top: `0%`,
            left: `${randomInt(95, 125)}%`,
        }, {
            top: `100%`,
            left: `${randomInt(5, 30)}%`,
            duration: randDuration,
            ease: "none",
            // delay: randDelay,
            onComplete: () => {
                timeLine.restart()
            }
        }).fromTo(astroRef.current, {
            rotateZ: randomInt(0, 360),
            y: `-100%`
        }, {
            rotateZ: randomInt(0, 360),
            y: `100%`,
            duration: randDuration,
            ease: 'none',
        }, `-=${randDuration}`);
        timeLine.seek((randomInt(30, 100)/100)*randDuration)
    })
    
	const { contextSafe } = useGSAP();
	const mouseParallax = contextSafe((event: MouseEvent, selector: string | null, powerFactor: number) => {
		if (selector == null) return;
		gsap.to(selector, {
			x: (event.clientX / window.innerWidth) * powerFactor,
			y: (event.clientY / window.innerHeight) * powerFactor,
		})
	})

    useEffect(() => {
        const powerFactor: number = -randomInt(0, 4) * 20;

        const mouseMoveHandler = (event: MouseEvent) => {
            mouseParallax(event, astroWrapRef.current, powerFactor)
        }

        window.addEventListener("mousemove", (event: MouseEvent) => {mouseMoveHandler(event)})

        return () => {
            window.removeEventListener("mousemove", (event: MouseEvent) => {mouseMoveHandler(event)})
        }
    }, [])

    return 	(
        <div className={styles.asteroidWrapper} ref={astroWrapRef}>
            <img ref={astroRef} className={className} src={`./assets/images/asteroid-${randomInt(1, 13 + 1)}.png`} style={customStyles} />
        </div>
    )
}
