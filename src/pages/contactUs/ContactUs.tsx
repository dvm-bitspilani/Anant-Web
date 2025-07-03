import styles from "./ContactUs.module.scss";
import { forwardRef } from "react";

const ContactUs = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={styles.contactUs} ref={ref} id="contact">
      <h1>CONTACT US</h1>
    </div>
  );
});

export default ContactUs;
