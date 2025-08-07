import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const useAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      easing: "ease-in-out", // easing
      once: false, // should animate every time you scroll up/down
      mirror: true, // animate again when scrolling back
    });

    // Refresh on route/page/component update
    AOS.refresh();
  }, []);
};

export default useAOS;
