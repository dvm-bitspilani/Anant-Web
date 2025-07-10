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
              <input
                type="text"
                placeholder="Your Name"
                className={styles.input}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className={styles.input}
                required
              />
              <textarea
                placeholder="Your Message"
                className={styles.textarea}
                required
              ></textarea>
              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div> 
        </div>
      </div>
    </div>
  );
});

export default ContactUs;
