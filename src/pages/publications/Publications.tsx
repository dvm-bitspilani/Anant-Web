import React, { useState, forwardRef } from "react";
import styles from "./Publications.module.scss";

// Publications data array
const publications = [
  {
    title:
      "Design and implementation of the software architecture and control for the Electrical Power Subsystem of a 3U hyperspectral imaging CubeSat",
    authors:
      "Parth Kharade, Devaansh Gupta, Dhairya Arora, Neel Tailor, Lavitra Garg",
    presentedAt: "71st International Astronautical Congress",
    location: "October 2020",
    link: "#",
  },
  {
    title:
      "Implementation and validation of Murrell's version Kalman filter for attitude estimation",
    authors:
      "Gaurav Sharma, Tushar Goyal, Aditya Bhardwaj, Nikita Saxena, Jeet Yadav",
    presentedAt: "71st International Astronautical Congress",
    location: "October 2020",
    link: "#",
  },
  {
    title: "Investigation of Instabilities In Detumbling Algorithms",
    authors: "Jeet Yadav and Tushar Goyal",
    presentedAt: "AeroConf IEEE Aerospace Conference",
    location: "USA: March 2020",
    link: "#",
  },
  {
    title:
      "Onboard and Ground Station Telemetry Architecture Design for a LEO Nanosatellite",
    authors: "Nishant Gupta, Umang Garg, Sakshi Agarwal, Mohit Vyas",
    presentedAt: "IEEE Aerospace conference 2020",
    location: "USA: March 2020",
    link: "#",
  },
  {
    title:
      "Interfacing Architecture between Telemetry and On-board Computer for a Nanosatellite",
    authors:
      "Abhishek Prasad, Yash Jain, Neelanchal Joshi, Nishant Gupta, Varsha Singhania, Yatharth Sreedharan",
    presentedAt: "41st IEEE Aerospace Conference",
    location: "USA: March 2020",
    link: "#",
  },
  {
    title: "Simulation and Selection of Detumbling Algorithms for a 3U Cubesat",
    authors: "Vishnu P Katkoori, Jivat Neet Kaur, Tushar Goyal",
    presentedAt: "70th Annual International Astronautical Congress (IAC)",
    location: "USA: October 2019",
    link: "#",
  },
  {
    title:
      "Hardware Architecture of Electrical Power System for 3U Hyperspectral Imaging CubeSat",
    authors: "Nihal Singh, Nishant Raman, Joy Parikh, Varun Goradia",
    presentedAt: "70th Annual International Astronautical Congress (IAC)",
    location: "USA: October 2019",
    link: "#",
  },
  {
    title:
      "Development and testing of an antenna deployment system for nanosatellite applications",
    authors: "Chintan Malde, Sundar Gurumurthy, Ritika Diwan",
    presentedAt: "70th Annual International Astronautical Congress (IAC)",
    location: "USA: October 2019",
    link: "#",
  },
  {
    title:
      "Flight Plan, Contingency Operation and Redundancy Provision for the Communication System of a 3U CubeSat with Hyperspectral Imaging Payload",
    authors:
      "Nishant Gupta, Mohit Vyas, Rutwik Jain, Umang Garg, Varsha Singhania, Sakshi Agarwal",
    presentedAt: "11th European Cubesat Symposium",
    location: "Luxembourg: September 2019",
    link: "#",
  },
  {
    title:
      "Dynamic active thermal control of LEO nanosatellite based on its modes of operation [Poster]",
    authors: "Sundar Gurumurthy, Chintan Malde",
    presentedAt: "AIAA/USU Small Satellite Conference",
    location: "USA: 2019",
    link: "#",
  },
  {
    title:
      "Implementation of CCSDS Hyperspectral Image Compression Algorithm onboard a nanosatellite",
    authors: "Neelanchal Joshi and Parth Kalgaonkar",
    presentedAt:
      "The 8th European Conference for Aeronautics and Space Sciences",
    location: "Spain: July 2019",
    link: "#",
  },
  {
    title:
      "Simulator for Functional Verification and Validation of a Nano-Satellite",
    authors: "Tushar Goyal, Kushagra Aggarwal",
    presentedAt: "40th IEEE Aerospace Conference",
    location: "USA: March 2019",
    link: "#",
  },
  {
    title: "In-Loop Simulation of Attitude Control of a Nano-Satellite",
    authors:
      "Vatsal J. Badami, Tushar Goyal, Shubham Sharma, Saurabh M. Raje, Kushagra Aggarwal",
    presentedAt: "40th IEEE Aerospace Conference",
    location: "USA: March 2019",
    link: "#",
  },
  {
    title:
      "Modes of Operation of a 3U Cubesat with Hyperspectral Imaging Payload",
    authors:
      "Rutwik N. Jain, Shubham Sharma, Kushagra Aggarwal, Tushar Goyal, Abhinav Sundhar, Ujjwal Anand, Nishad Sahu, Joy Parikh",
    presentedAt: "69th International Astronautical Congress",
    location: "Germany: October 2018",
    link: "#",
  },
  {
    title:
      "Comparative Study of Classical and Fuzzy PID Attitude Control System with Extended Kalman Filter Feedback For Nanosatellites",
    authors: "Prerna Baranwala, Karabee Battab, Tushar Kaushik",
    presentedAt: "69th International Astronautical Congress",
    location: "Germany: October 2018",
    link: "#",
  },
  {
    title:
      "Design and Devlopement of a Three-Axis Controlled Helmholtz Cage as an in-house Magnetic Field Simulator for CubeSats",
    authors:
      "Tushar Goyal, Karabee Batta, Prerna Baranwal, Awais Ahmed N A, Niharika More, Rudrakh Panigrahi, Tushar Kaushik",
    presentedAt: "68th International Astronautical Congress",
    location: "Australia: September 2017",
    link: "#",
  },
  {
    title: "Devlopement of an On-Board Computer of a Nanosatellite",
    authors:
      "Saurabh M. Raje, Abhishek Goel, Shubham Sharma, Kushagra Aggarwal, Dhananjay Mantri, Tanuj Kumar",
    presentedAt: "68th International Astronautical Congress",
    location: "Australia: September 2017",
    link: "#",
  },
  {
    title:
      "Hyperspectral imaging in Cubesats: A possibility and promising technology for developing",
    authors: "Hemant Kumar Singh et al.",
    presentedAt: "Selected for IAA Latin America CubeSat Workshop",
    location: "Brazil: 2014",
    link: "#",
  },
  {
    title:
      "A review of Attitude Determination and Control Subsystem of a Nanosatellite",
    authors: "Parth Garg, et al.",
    presentedAt: "6th European Cubesat Symposium",
    location: "Switzerland: October 2014",
    link: "#",
  },
  {
    title: "Modelling and simulation of onboard wire antennas for a 3U Cubesat",
    authors: "Umang Garg and Rutwik Jain",
    presentedAt: "Photonics and Electromagnetics research symposium",
    location: "",
    link: "#",
  },
];

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
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLocation}>{pub.location}</span>
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
