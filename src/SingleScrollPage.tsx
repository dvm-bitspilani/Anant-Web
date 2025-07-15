// import { useState } from "react";
// import styles from "./App.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Nav from "./pages/commonComponent/nav/Nav";
import ContactUs from "./pages/contactUs/ContactUs";
import { useEffect, useRef } from "react";
import UpdatesPage from "./pages/updates/Updates";
import MeetTeam from "./pages/MeetTeam/MeetTeam";
import Publications from "./pages/publications/Publications";
import styles from "./SingleScrollerPage.module.scss";

const pages = [
  "home",
  "updates",
  "publication",
  "sub-systems",
  "team",
  "contact",
];
function SingleScrollPage() {
  const isNavigating = useRef<boolean>(false);
  const isNavigatingViaNav = useRef<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pageRefs = useRef(
    {} as Record<(typeof pages)[number], HTMLDivElement | null>
  );

  const setRef = (page: (typeof pages)[number]) => {
    return (el: HTMLDivElement | null) => {
      if (el) {
        pageRefs.current[page] = el;
      }
    };
  };

  useEffect(() => {
    const page = location.pathname.replace("/", "") as (typeof pages)[number];
    let targetRef = pageRefs.current[page];
    if (page == "") {
      targetRef = pageRefs.current["home"];
    }
    if (!pages.includes(page) && page != "") {
      navigate("/");
      return;
    }
    
    if (targetRef && !isNavigating.current) {
      targetRef.scrollIntoView({
        behavior: "smooth",
        block: (!isNavigatingViaNav.current) ? "nearest" : "start",
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = entry.target.id;
            if ((!isNavigating.current && page && pages.includes(page)) || page === "") {
              navigate(`/${page}`);
            }
          }
        });
      },
      { threshold: 0.25 }
    );
    const homeObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isNavigating.current) navigate("/")
      }, {threshold: 0.1} // this is due to home taking 2 viewport height at minimum
    )
    Object.values(pageRefs.current).slice(1).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });
    if (pageRefs.current["home"]) homeObserver.observe(pageRefs.current["home"])
    return () => {
      observer.disconnect();
      homeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.singleScrollerPage}>
      <div className={styles.mainBg}>
        <div className={styles.mainBgImage}></div>
      </div>
      <Nav 
        isNavigating={isNavigating}
        isNavigatingViaNav={isNavigatingViaNav} />
      <Home ref={setRef(pages[0])} />
      <UpdatesPage ref={setRef(pages[1])} />
      <Publications ref={setRef(pages[2])} id={pages[2]} />
      <MeetTeam ref={setRef(pages[4])} />
      <ContactUs ref={setRef(pages[5])} />
    </div>
  );
}

export default SingleScrollPage;
