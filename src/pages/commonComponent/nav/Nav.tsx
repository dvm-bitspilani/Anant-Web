import styles from "./Nav.module.scss";
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Updates", path: "/updates" },
  { name: "Publication", path: "/publication" },
  { name: "Sub-Systems", path: "/sub-systems" },
  { name: "Team", path: "/team" },
  { name: "Contact Us", path: "/contact" },
];

export default function Nav() {
  const linesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.from(`.${styles.navItem}`, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 9,
    });
    gsap.from(`.${styles.sidebarlines}`, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      ease: "back.out(1.7)",
      delay: 9.2,
    });
  });
  return (
    <nav className={styles.nav}>
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
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              {item.name}
              <div className={styles.dot}></div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
