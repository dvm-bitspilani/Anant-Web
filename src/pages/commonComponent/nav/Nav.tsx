import styles from "./Nav.module.scss";
import { NavLink } from "react-router-dom";
import { useGSAP} from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "/assets/images/home-anant-logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Updates", path: "/updates" },
  { name: "Publication", path: "/publication" },
  { name: "Sub-Systems", path: "/sub-systems" },
  { name: "Team", path: "/team" },
  { name: "Contact Us", path: "/contact" },
];

interface propType {
  isNavigating: React.RefObject<boolean>,
  isNavigatingViaNav: React.RefObject<boolean>,
}

export default function Nav(props: propType) {
  const linesRef = useRef<HTMLDivElement[]>([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 600;

  useGSAP(() => {
    let delay = currentPath === "/" ? 7.5 : 1;
    gsap.from(`.${styles.navItem}`, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: delay,
    });
    gsap.from(`.${styles.sidebarlines}`, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: "back.out(1.7)",
      delay: delay + 0.2,
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (isMobile) {
      if (isMenuOpen) {
        tl.to(`.${styles.line1}`, {
          rotate: 45,
          y: 6.5,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power1.inOut",
        })
          .to(
            `.${styles.line2}`,
            {
              opacity: 0,
              duration: 0.3,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            `.${styles.line3}`,
            {
              rotate: -45,
              transformOrigin: "center",
              y: -6.5,

              duration: 0.3,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(`.${styles.nav}`, {
            transform: "translateX(0)",
            duration: 0.4,
            ease: "power1.inOut",
          })
          .from(`.${styles.navItem}`, {
            duration: 0.4,
            opacity: 0,
            y: -20,
            stagger: 0.1,
            ease: "back.out(1.7)",
          })
          .from(
            `.${styles.sidebarlines}`,
            {
              duration: 0.4,
              opacity: 0,
              y: -20,
              delay: 0.2,
              ease: "back.out(1.7)",
            },
            "<"
          );
      } else {
        tl.to(`.${styles.line1}`, {
          rotate: 0,
          y: 0,
          transformOrigin: "center",
          duration: 0.3,
          ease: "power1.inOut",
        })
          .to(
            `.${styles.line2}`,
            {
              opacity: 1,

              duration: 0.3,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            `.${styles.line3}`,
            {
              rotate: 0,
              transformOrigin: "center",
              y: 0,
              duration: 0.3,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(`.${styles.nav}`, {
            transform: "translateX(-100%)",
            duration: 0.4,
            ease: "power1.inOut",
          });
      }
    }
  }, [isMenuOpen]);

  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={styles.menuIcon}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <ul className={styles.navList}>
          <div className={styles.sidebarlines}>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                ref={(el) => {
                  if (el) linesRef.current[index] = el;
                }}
                key={index}
                className={`${styles.sidebarline} ${
                  styles[`sidebarline${index + 1}`]
                }`}
              ></div>
            ))}
          </div>
          {navItems.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <NavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  props.isNavigatingViaNav.current = true;
                  window.addEventListener("scroll", () => {
                    props.isNavigating.current = true;
                  }, {once: true})
                  window.addEventListener("scrollend", () => {
                    props.isNavigating.current = false;
                    props.isNavigatingViaNav.current = false;
                  }, {once: true})
                }}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                <div>{item.name}</div>
                <div className={styles.dot}></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
