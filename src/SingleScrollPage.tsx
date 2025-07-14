// import { useState } from "react";
// import styles from "./App.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Nav from "./pages/commonComponent/nav/Nav";
import ContactUs from "./pages/contactUs/ContactUs";
import { useEffect, useRef } from "react";
import UpdatesPage from "./pages/updates/Updates";
import Publications from "./pages/publications/Publications";
import styles from "./SingleScrollerPage.module.scss"

const pages = [
  "home",
  "updates",
  "publication",
  "sub-systems",
  "team",
  "contact",
];
function SingleScrollPage() {
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

    if (targetRef) {
      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = entry.target.id;
            if ((page && pages.includes(page)) || page === "") {
              navigate(`/${page}`);
            }
          }
        });
      },
      { threshold: 0.25 }
    );
    Object.values(pageRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.singleScrollerPage}>
      <div className={styles.mainBg}>
        <div className={styles.mainBgImage}></div>
      </div>
      <Nav />
      <Home ref={setRef(pages[0])} />
      <UpdatesPage ref={setRef(pages[1])} />
      <Publications ref={setRef(pages[2])} id={pages[2]} />
      <ContactUs ref={setRef(pages[5])} />
    </div>
  );
}

export default SingleScrollPage;
