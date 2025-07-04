import { forwardRef } from "react";
import UpdatesCarousel from "../../components/UpdatesCarousel";


const UpdatesPage= forwardRef<HTMLDivElement>((_,ref)=>{
  return (
    <div ref={ref} id="updates">
      <UpdatesCarousel />
    </div>
  );
});
export default UpdatesPage
