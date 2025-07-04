import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './UpdatesCarousel.scss';
import { updates } from '../data/UpdatesData';
import type { UpdateItem } from '../data/UpdatesData';
import { TbLocationFilled } from 'react-icons/tb';

const categories = ['All', 'Conference', 'Workshop', 'Event'] as const;

const UpdatesCarousel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All');
  const [activeUpdate, setActiveUpdate] = useState<UpdateItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const swiperRef = useRef<any>(null);

  const filtered = updates
    .filter(
      (u) =>
        selectedCategory.toLowerCase() === 'all' ||
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
    <div className="updates-wrapper">
      <h2 className="page-title">Latest Updates</h2>

      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            style={{ zIndex: 9, position: 'relative' }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
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
        centeredSlides
        loop
        parallax
        slidesPerView={1}
        creativeEffect={{
          limitProgress: 2,
          prev: {
            shadow: true,
            translate: ['-20%', '4%', -100],
            scale: 0.8,
          },
          next: {
            shadow: true,
            translate: ['20%', '4%', -100],
            scale: 0.9,
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
              <div className="trapezium-tag">
                <span>{update.category}</span>
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
  );
};

export default UpdatesCarousel;
