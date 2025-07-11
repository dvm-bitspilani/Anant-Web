import styles from "./ContactUs.module.scss";
import { forwardRef } from "react";
import heading from "/assets/images/contactHeading.svg";
import formBg from "/assets/images/contactFormBackground.svg";

const ContactUs = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={styles.contactUs} ref={ref} id="contact">
      <div className={styles.heading}>
        <img src={heading} alt="Contact" className={styles.headingImg} />
      </div>
      <div className={styles.body}>
        <div className={styles.formContainer}>
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
            <form>
              <div className={`${styles.section1} ${styles.section}`}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className={styles.input}
                    id="name"
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
                    required
                    rows={13}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactUs;
