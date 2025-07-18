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
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const pages = [
	"home",
	"updates",
	"publication",
	"sub-systems",
	"team",
	"contact",
];
function SingleScrollPage() {
	const bgRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const pageRefs = useRef(
		{} as Record<(typeof pages)[number], HTMLDivElement | null>
	);
	const isNavigating = useRef<boolean>(location.pathname !== "/");
	// If location requested is different from home, then allow scrolling to that section
	const isNavigatingViaNav = useRef<boolean>(location.pathname !== "/");

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

		if (targetRef && isNavigatingViaNav.current) {
			targetRef.scrollIntoView({
				behavior: "smooth",
				// block: (!isNavigatingViaNav.current) ? "nearest" : "start",
				block: "start",
			});
		}
	}, [location.pathname]);

	useEffect(() => {
		if (isNavigating || isNavigatingViaNav) window.addEventListener("scrollend", () => {
			isNavigating.current = false;
			isNavigatingViaNav.current = false;
		}, { once: true });

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
			}, { threshold: 0.1 } // this is due to home taking 2 viewport height at minimum
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

	useGSAP(() => {
		gsap.from(bgRef.current, {
			opacity: 0,
			duration: 1,
			delay: 1.5
		})
	})

	return (
		<div className={styles.singleScrollerPage}>
			<div className={styles.mainBg} ref={bgRef}>
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
