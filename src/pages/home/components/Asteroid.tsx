import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.scss';
import { randomInt } from '../../../global';

export default function Asteroid({className, key, astroIntroOver, setAstroIntroOver}: {className: string, key: number, astroIntroOver: boolean, setAstroIntroOver: React.Dispatch<React.SetStateAction<boolean>>}) {

    console.log(astroIntroOver, setAstroIntroOver) //? Temp, just to get rid of build errors
    let customStylesRef = useRef({
        width: `${randomInt(5, 75)}px`,
    })

    let customPropertiesRef = useRef({
        src: `./assets/images/asteroid-${randomInt(1, 13 + 1)}.png`,
    })
    
    const astroRef = useRef(null)
    const astroInWrapRef = useRef(null)
    const astroWrapRef = useRef(null)

    useGSAP(() => {
        const timeLine = gsap.timeline()
        const randDuration = randomInt(450, 750)/10
        // const randDelay = randomInt(0, 600)/10
        timeLine.fromTo(astroWrapRef.current, {
            top: `0%`,
            left: `${randomInt(95, 125)}%`,
        }, {
            top: `95%`,
            left: `${randomInt(-25, 0)}%`,
            duration: randDuration,
            ease: "none",
            // delay: randDelay,
            onComplete: () => {
                timeLine.restart()
            }
        }).fromTo(astroRef.current, {
            rotateZ: randomInt(0, 360),
            y: `-100%`,
            x: `100%`
        }, {
            rotateZ: randomInt(0, 360),
            y: `100%`,
            x: `-100%`,
            duration: randDuration,
            ease: 'none',
        }, `-=${randDuration}`);
        timeLine.seek((randomInt(5, 95)/100)*randDuration)

        gsap.registerPlugin(ScrollTrigger)
        gsap.to(astroInWrapRef.current, {
			scrollTrigger: {
				trigger: `.${styles.hero}`,
				scrub: true,
				start: "top 0%"
			},
			y: randomInt(90, 180),
            ease: "sine.inOut"
        })
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
        const powerFactor: number = -randomInt(0, 9) * 5;

        const mouseMoveHandler = (event: MouseEvent) => {
            mouseParallax(event, astroWrapRef.current, powerFactor)
        }

		//* Activate mouse parallax after intro animation is completed (except for intro)
		const mouseMoveEventRegisterTimeOut = setTimeout(() => {
			window.addEventListener("mousemove", mouseMoveHandler)
		}, location.pathname === "/" ? 7500 : 0);

        return () => {
            window.removeEventListener("mousemove", mouseMoveHandler)
            clearInterval(mouseMoveEventRegisterTimeOut)
        }
    }, [])

    return 	(
        <div className={styles.asteroidWrapper} key={key} ref={astroWrapRef}>
            <div className={styles.asteroidInnerWrapper} ref={astroInWrapRef}>
                <img 
                    ref={astroRef} 
                    className={className} 
                    src={customPropertiesRef.current.src} 
                    style={customStylesRef.current} />
            </div>
        </div>
    )
}
