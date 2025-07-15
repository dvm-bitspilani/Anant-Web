import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './UpdatesCarousel.scss';
import { updates } from '../data/UpdatesData';
import type { UpdateItem } from '../data/UpdatesData';
import { TbLocationFilled } from 'react-icons/tb';
import StarBackground from '../pages/commonComponent/starbg/StarBackground';

const categories = ['All Categories', 'Conference', 'Workshop', 'Event'] as const;

const UpdatesCarousel: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All Categories');
	const [showOverlay, setShowOverlay] = useState(false);
	const [activeUpdate, setActiveUpdate] = useState<UpdateItem | null>(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const swiperRef = useRef<any>(null);

	const filtered = updates
		.filter(
			(u) =>
				selectedCategory.toLowerCase() === 'all categories' ||
				u.category.toLowerCase() === selectedCategory.toLowerCase()
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	useEffect(() => {
		if (swiperRef.current) {
			setCurrentSlide(swiperRef.current.swiper.realIndex);
		}
	}, [selectedCategory]);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (activeUpdate && windowWidth < 768) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [activeUpdate, windowWidth]);

	return (
		<StarBackground numOfStars={25}>
			<div className="updates-wrapper">
				<h2 className="page-title">Updates</h2>
				<div className="headingline" >
					<svg width="311" height="20" viewBox="0 0 311 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g opacity="0.9">
							<path d="M2.5 16.8105H120.5L132 1.31055H311" stroke="white" />
							<circle cx="2.5" cy="16.8105" r="1.5" fill="white" />
							<g opacity="0.4">
								<path d="M142.129 12.3113L134.517 16.4424L134.745 7.78516L142.129 12.3113Z" fill="white" />
							</g>
							<g opacity="0.5">
								<path d="M151.129 12.3105L143.517 16.4417L143.745 7.78443L151.129 12.3105Z" fill="white" />
							</g>
							<g opacity="0.6">
								<path d="M160.129 12.3122L152.517 16.4434L152.745 7.78614L160.129 12.3122Z" fill="white" />
							</g>
							<g opacity="0.7">
								<path d="M169.129 12.3117L161.517 16.4429L161.745 7.78565L169.129 12.3117Z" fill="white" />
							</g>
							<g opacity="0.8">
								<path d="M178.129 12.3115L170.517 16.4427L170.745 7.7854L178.129 12.3115Z" fill="white" />
							</g>
							<g opacity="0.9">
								<path d="M187.128 12.311L179.517 16.4422L179.745 7.78492L187.128 12.311Z" fill="white" />
							</g>
							<path d="M196.128 12.3122L188.517 16.4434L188.745 7.78614L196.128 12.3122Z" fill="white" />
							<rect opacity="0.2" x="198.259" y="5.31055" width="12" height="12" fill="white" />
							<rect opacity="0.4" x="212.259" y="5.31055" width="12" height="12" fill="white" />
							<rect opacity="0.6" x="226.259" y="5.31055" width="12" height="12" fill="white" />
							<rect opacity="0.7" x="240.259" y="5.31055" width="12" height="12" fill="white" />
							<rect opacity="0.6" x="254.259" y="5.31055" width="12" height="12" fill="white" />
							<rect opacity="0.8" x="268.259" y="5.31055" width="12" height="12" fill="white" />
							<rect opacity="0.9" x="282.259" y="5.31055" width="12" height="12" fill="white" />
							<rect x="296.259" y="5.31055" width="12" height="12" fill="white" />
						</g>
					</svg>

				</div>


				<div className="category-filter">

					{showOverlay ? (
						<div className="filter-overlay" onClick={() => setShowOverlay(false)}>
							<div
								className="filter-content"
								onClick={(e) => e.stopPropagation()}
							>
								{categories.map((cat) => (
									<button
										key={cat}
										className={`category-button ${cat.toLowerCase()} ${selectedCategory === cat ? 'active' : ''
											}`}
										onClick={() => {
											setSelectedCategory(cat);
											setShowOverlay(false);
										}}
									>
										{cat === 'All Categories' ? (
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1.34686 24L0 22.6531L10.6531 12L0 1.34686L1.34686 0L12 10.6531L22.6531 0L24 1.34686L13.3469 12L24 22.6531L22.6531 24L12 13.3469L1.34686 24Z" fill="white" />
											</svg>
										) : (
											cat
										)}
									</button>
								))}

							</div>
						</div>
					): (
						
						<button
							className="filter-button"
							onClick={() => setShowOverlay(true)}
						>
							{selectedCategory}
							<svg
								width="18.21"
								height="16"
								viewBox="0 0 18.21 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								style={{ marginLeft: '8px' }}
							>
								<path
									d="M0.474609 1.04348C0.474609 0.766731 0.561818 0.501318 0.71705 0.305628C0.872283 0.109937 1.08282 0 1.30236 0H17.8573C18.0768 0 18.2873 0.109937 18.4426 0.305628C18.5978 0.501318 18.685 0.766731 18.685 1.04348C18.685 1.32023 18.5978 1.58564 18.4426 1.78133C18.2873 1.97702 18.0768 2.08696 17.8573 2.08696H1.30236C1.08282 2.08696 0.872283 1.97702 0.71705 1.78133C0.561818 1.58564 0.474609 1.32023 0.474609 1.04348ZM3.23376 8C3.23376 7.72325 3.32097 7.45784 3.4762 7.26215C3.63144 7.06646 3.84198 6.95652 4.06151 6.95652H15.0981C15.3177 6.95652 15.5282 7.06646 15.6834 7.26215C15.8387 7.45784 15.9259 7.72325 15.9259 8C15.9259 8.27675 15.8387 8.54216 15.6834 8.73785C15.5282 8.93354 15.3177 9.04348 15.0981 9.04348H4.06151C3.84198 9.04348 3.63144 8.93354 3.4762 8.73785C3.32097 8.54216 3.23376 8.27675 3.23376 8ZM6.54475 14.9565C6.54475 14.6798 6.63196 14.4144 6.78719 14.2187C6.94242 14.023 7.15296 13.913 7.37249 13.913H11.7871C12.0067 13.913 12.2172 14.023 12.3724 14.2187C12.5277 14.4144 12.6149 14.6798 12.6149 14.9565C12.6149 15.2333 12.5277 15.4987 12.3724 15.6944C12.2172 15.8901 12.0067 16 11.7871 16H7.37249C7.15296 16 6.94242 15.8901 6.78719 15.6944C6.63196 15.4987 6.54475 15.2333 6.54475 14.9565Z"
									fill="white"
								/>
							</svg>
						</button>
					)}
				</div>

				<Swiper
					modules={[Navigation, EffectCreative, Parallax]}
					navigation={{
						nextEl: '.custom-next',
						prevEl: '.custom-prev',
					}}
					onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
					effect="creative"
					resistance
					resistanceRatio={1}
					threshold={10}
					grabCursor
					loop
					parallax
					slidesPerView={1}
					creativeEffect={{
						limitProgress: 2,
						next: {
							shadow: true,
							translate: ['20%', '4%', -100],
							scale: 0.78125,
						},
					}}
					className="updates-swiper"
					ref={swiperRef}
				>
					{filtered.map((update, index) => (
						<SwiperSlide key={update.id}>
							<div
								className={`update-card ${update.category.toLowerCase()}`}
								onClick={() => {
									if (windowWidth < 768) setActiveUpdate(update);
								}}
							>
								<div className="card-content">
									<h3
										data-swiper-parallax="-100"
										style={{ opacity: index === currentSlide ? 1 : 0.3 }}
									>
										{update.title}
									</h3>
									<div className="line">
										<svg width="880" height="2" viewBox="0 0 880 2" fill="none" xmlns="http://www.w3.org/2000/svg">
											<line x1="0.368652" y1="0.637526" x2="833.7" y2="1.55779" stroke="url(#paint0_linear_365_39)" stroke-width="0.920261" />
											<line x1="46" y1="0.637526" x2="879.331" y2="1.55779" stroke="url(#paint1_linear_365_39)" stroke-width="0.920261" />
											<defs>
												<linearGradient id="paint0_linear_365_39" x1="0.368652" y1="1.55779" x2="833.7" y2="1.55779" gradientUnits="userSpaceOnUse">
													<stop stop-color="white" stop-opacity="0.2" />
													<stop offset="0.528846" stop-color="white" />
													<stop offset="1" stop-color="#999999" stop-opacity="0.2" />
												</linearGradient>
												<linearGradient id="paint1_linear_365_39" x1="46" y1="1.55779" x2="879.331" y2="1.55779" gradientUnits="userSpaceOnUse">
													<stop stop-color="white" stop-opacity="0.2" />
													<stop offset="0.528846" stop-color="white" />
													<stop offset="1" stop-color="#999999" stop-opacity="0.2" />
												</linearGradient>
											</defs>
										</svg>

									</div>
									<img
										src={update.image}
										alt={update.title}
										data-swiper-parallax="-20%"
										style={{ opacity: index === currentSlide ? 1 : 0.3 }}
									/>
									<div
										className={`des ${windowWidth >= 768 ? 'full-text' : 'clamped-text'}`}
										data-swiper-parallax="-100"
										style={{ opacity: index === currentSlide ? 1 : 0.3 }}
									>
										{update.description}
									</div>
								</div>
								<div className="trapezium-border">
									<div className="trapezium-tag">
										<span>{update.category}</span>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className="swiper-controls">
					<button className="custom-prev" aria-label="Previous Slide">
						<TbLocationFilled style={{ transform: 'rotate(230deg)' }} />
					</button>

					<span className="page-indicator">
						{currentSlide + 1} / {filtered.length}
					</span>

					<button className="custom-next" aria-label="Next Slide">
						<TbLocationFilled style={{ transform: 'rotate(50deg)' }} />
					</button>
				</div>

				{activeUpdate && windowWidth < 768 && (
					<div className="overlay" onClick={() => setActiveUpdate(null)}>
						<div className="overlay-content" onClick={(e) => e.stopPropagation()}>
							<h2>{activeUpdate.title}</h2>
							<img src={activeUpdate.image} alt={activeUpdate.title} />
							<p className="category">{activeUpdate.category}</p>
							<p className="date">{new Date(activeUpdate.date).toDateString()}</p>
							<p className="desc">{activeUpdate.description}</p>
							<button onClick={() => setActiveUpdate(null)}>Close</button>
						</div>
					</div>
				)}
			</div>
		</StarBackground>
	);
};

export default UpdatesCarousel;

