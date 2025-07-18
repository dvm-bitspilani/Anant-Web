import React, { useEffect, useRef, useState } from 'react'
import styles from './Preloader.module.scss'
import { randomInt } from '../../global';
import { useGSAP, type ContextSafeFunc } from '@gsap/react';
import { gsap } from 'gsap';
import { assetList } from './assetList';

interface preloaderProps {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Preloader(props: preloaderProps) {
	const hasRunOnce = useRef(false);
	const [starList, setStarList] = useState<React.JSX.Element[]>([]);
	const [percentageLoaded, setPercentageLoaded] = useState(0);
	const numOfAssets = Object.values(assetList).reduce((sum, arr) => sum + arr.length, 0);
	const maxStars = 30;
	const preLoaderRef = useRef<HTMLDivElement>(null);

	const {contextSafe}: {contextSafe: ContextSafeFunc} = useGSAP();

	const addNewStars = (num: number) => {
		const time = (new Date()).getTime();
		setStarList((prev) => [...prev, ...Array(num).fill(null).map((_, index) => <Star key={time + index} />)])
	}

	const cacheAssets = async (assetList: Record<string, string[]>) => {
		const promises = [
			...assetList.images.map((imgSrc) => (
				new Promise((resolve, reject) => {
					const img = new Image();
					img.src = imgSrc;
					img.onload = () => {
						setPercentageLoaded((prev) => {
							const newPercentage = prev + (1/numOfAssets)*100;
							return newPercentage;
						});
						return resolve(img)
					};
					img.onerror = (err) => {
						setPercentageLoaded((prev) => {
							const newPercentage = prev + (1/numOfAssets)*100;
							return newPercentage;
						});
						return reject(err);
					};
				})
			)),
			...assetList.videos.map((videoSrc) => (
				new Promise((resolve, reject) => {
					const video = document.createElement('video');
					video.src = videoSrc;
					video.onloadeddata = () => {
						setPercentageLoaded((prev) => {
							const newPercentage = prev + (1/numOfAssets)*100;
							return newPercentage;
						});
						return resolve(video);
					};
					video.onerror = (err) => {
						setPercentageLoaded((prev) => {
							const newPercentage = prev + (1/numOfAssets)*100;
							return newPercentage;
						});
						return reject(err);
					};
				})
			))
		]

		await Promise.all(promises);
		(contextSafe(() => {
			gsap.to(preLoaderRef.current, {
				opacity: 0,
				duration: 1,
				onComplete: () => {
					props.setIsLoading(false);
				}
			})
		}))();
		// props.setIsLoading(false);
	}

	const Star = function() { 
		
		const starRef = useRef<HTMLDivElement>(null);
		const {contextSafe}: {contextSafe: ContextSafeFunc} = useGSAP();

		const animateStar = contextSafe(() => {
			const stickXY = randomInt(0, 2); // decides whether the star should go to an extreme x pos or y, 0 for x
			const stickEnd = randomInt(0, 2); // decides which end of the axis the star should go, 0 for left/top, 1 for right/bottom

			gsap.to(starRef.current, {
				opacity: 2,
				top: `${stickXY ? stickEnd*100 : randomInt(0, 100)}%`,
				left: `${!stickXY ? stickEnd*100 : randomInt(0, 100)}%`,
				x: `${stickEnd ? 200 : -200}%`,
				y: `${stickEnd ? 200 : -200}%`,
				ease: "linear",
				delay: randomInt(0, 100)/100,
				duration: 1, // randomInt(100, 200)/100,
				onComplete: () => {
					gsap.set(starRef.current, {
						top: `50%`,
						left: `50%`,
						opacity: 0,
						x: 0,
						y: 0
					})
					animateStar()
				}
			})
		})

		const customStyles:React.CSSProperties = {
			width: randomInt(2, 6),
		}

		useEffect(() => {
			animateStar()
		}, [])

		return <div 
			ref={starRef}
			className={styles.star} 
			style={customStyles} />
	}

	useEffect(() => {
		addNewStars(Math.floor(percentageLoaded*maxStars/100 - starList.length));
	}, [percentageLoaded]);

	useEffect(() => {
		if (hasRunOnce.current) return;
		hasRunOnce.current = true;

		setStarList(Array(maxStars*percentageLoaded).fill(null).map((_, index) => <Star key={index} />))
		cacheAssets(assetList);
	}, [])

	return (
		<div className={styles.preloader} ref={preLoaderRef}>
			<div className={styles.preloaderBg}>
				{starList}
			</div>
			<div className={styles.percentWrapper}>
				<div className={styles.percentText}>
					{Math.round(percentageLoaded)}%
				</div>'
			</div>
		</div>
	)
}
