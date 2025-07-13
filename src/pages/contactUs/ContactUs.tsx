import styles from "./ContactUs.module.scss";
import { forwardRef, use, useEffect, useRef, useState } from "react";
import heading from "/assets/images/contactHeading.svg";
import formBg from "/assets/images/contactFormBackground.svg";
import submitBtn from "/assets/images/sendSubmitBtn.svg";
import submitBtnMob from "/assets/images/sendSubmitBtnMob.svg";
import submitBtnHover from "/assets/images/btn.svg";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const ContactUs = forwardRef<HTMLDivElement>((_, ref) => {
  const [fromData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const boxRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  let submitBtnSrc: string = isMobile ? submitBtnMob : submitBtn;
  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    submitBtnSrc = isMobile ? submitBtnMob : submitBtn;
  }, [isMobile]);

  useGSAP(() => {
    const tl = gsap.timeline();

    const contactAnimation = () => {
      tl.to(`.${styles.backgroundMid}`, {
        duration: 0.7,
        height: "15vw",
        delay: 0.2,
        ease: "power1.inOut",
      })
        .to(
          `.${styles.form}`,
          {
            duration: 0.7,
            y: -20,
            opacity: 1,
            ease: "power1.inOut",
          },
          "<0.2"
        )
        .to(
          `.${styles.subBtn}`,
          {
            duration: 0.7,
            y: 0,
            opacity: 1,
            ease: "power1.inOut",
          },
          "<0.2"
        );
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contactAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.contactUs} ref={ref} id="contact">
      <div className={styles.heading}>
        <img src={heading} alt="Contact" className={styles.headingImg} />
      </div>
      <div className={styles.body}>
        <div className={styles.formContainer} ref={boxRef}>
          <div className={styles.background}>
            <div className={styles.backgroundTop}>
              <img src={formBg} alt="bg" />
            </div>
            <div className={styles.backgroundMid}>
              <img src={formBg} alt="bg" />
            </div>
            <div className={styles.backgroundBottom}>
              <img src={formBg} alt="bg" />
            </div>
          </div>
          <div className={styles.form}>
            <form onSubmit={submitHandler}>
              <div className={`${styles.section1} ${styles.section}`}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className={styles.input}
                    id="name"
                    value={fromData.name}
                    onChange={inputHandler}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email ID"
                    className={styles.input}
                    id="email"
                    value={fromData.email}
                    onChange={inputHandler}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="number"
                    placeholder="Enter Your Mobile Number"
                    className={styles.input}
                    id="mobile"
                    value={fromData.mobile}
                    onChange={inputHandler}
                    required
                  />
                </div>
              </div>
              <div className={`${styles.section2} ${styles.section}`}>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message To Us</label>
                  <textarea
                    placeholder="Enter Your Message"
                    className={styles.textarea}
                    id="message"
                    value={fromData.message}
                    onChange={inputHandler}
                    required
                    rows={13}
                  ></textarea>
                </div>
              </div>
              <div className={styles.subBtn}>
                <button type="submit">
                  <img
                    src={submitBtnSrc}
                    alt="submitbtn"
                    className={styles.btnBackground}
                  />
                  <img
                    src={submitBtnHover}
                    alt="submitbtnHover"
                    className={styles.hover}
                  />
                  <div className={styles.text}>SEND</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactUs;
