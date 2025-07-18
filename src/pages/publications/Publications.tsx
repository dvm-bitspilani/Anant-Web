import React, { useState, forwardRef } from "react";
import styles from "./Publications.module.scss";
import { publications } from "./publicationData";

const CARDS_PER_PAGE = 6;

const Publications = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(publications.length / CARDS_PER_PAGE);
  const startIdx = (page - 1) * CARDS_PER_PAGE;
  const paginated = publications.slice(startIdx, startIdx + CARDS_PER_PAGE);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div
      ref={ref}
      id={props.id}
      className={styles.publicationsSection}
      {...props}
    >
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Works Published</h2>
        <img
          src="/assets/images/titleBottomItem.png"
          alt=""
          className={styles.titleUnderline}
        />
      </div>

      <div className={styles.cardsGrid}>
        {paginated.map((pub, idx) => (
          <a
            className={styles.card}
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
          >
            <img
              src="/assets/images/publications-cardFrame.png"
              alt=""
              className={styles.cardFrame}
              draggable={false}
            />
            <img
              src="/assets/images/publications-card-bg.png"
              alt=""
              className={styles.cardFrameBg}
              draggable={false}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span title={pub.location} className={styles.cardLocation}>{pub.location}</span>
              </div>
              <div className={styles.cardTitle}>{pub.title}</div>
              <div className={styles.cardAuthors}>By {pub.authors}</div>
              <div className={styles.cardPresentedAt}>
                Presented at {pub.presentedAt}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.arrowBtn}
          onClick={handlePrev}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          <img src="/assets/images/publications-leftArrow.png" alt="Previous" />
        </button>
        <span className={styles.pageInfo}>
          <span>Page</span> {page} / {totalPages}
        </span>
        <button
          className={styles.arrowBtn}
          onClick={handleNext}
          disabled={page === totalPages}
          aria-label="Next Page"
        >
          <img src="/assets/images/publications-rightArrow.png" alt="Next" />
        </button>
      </div>
    </div>
  );
});

export default Publications;
