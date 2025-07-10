import { type ReactElement } from 'react'
import styles from './StarBackground.module.scss'
import { useRef } from 'react';
import { randomInt } from '../../../global';

const Star = ({ className }: { className: string }) => {
    const customStylesRef = useRef({
        top: `${randomInt(0, 100)}%`,
        left: `${randomInt(0, 100)}%`,
        opacity: randomInt(4, 8) / 10,
        width: `${randomInt(1, 5)}px`,
    });

    return <div className={className} style={customStylesRef.current} />;
};

export default function StarBackground({children, numOfStars, starClass = ''} : {children?: ReactElement | ReactElement[], numOfStars: number, starClass?: string}) {

    return (
        <>
            <div className={styles.starBg}>
                {
                    Array(numOfStars)
                        .fill(null)
                        .map(() => (
                            <Star className={`${styles.star} ${starClass}`} />
                        ))
                }
            </div>
            {children}
        </>
    )
}
