import { forwardRef } from "react";
import UpdatesCarousel from "../../components/UpdatesCarousel";
import styles from "./Updates.module.scss"

const UpdatesPage= forwardRef<HTMLDivElement>((_,ref)=>{
  return (
    <div ref={ref} id="updates" className={styles.updatePage}>
      <UpdatesCarousel />
    </div>
  );
});
export default UpdatesPage
